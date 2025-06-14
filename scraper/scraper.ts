import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';
import * as ProxyChain from 'proxy-chain';
import randomUseragent from 'random-useragent';

interface ProxyConfig {
    url: string;
    username?: string;
    password?: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getRandomDelay = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const loadProxies = (): ProxyConfig[] => {
    try {
        const proxyList = fs.readFileSync('proxies.txt', 'utf-8')
            .split('\n')
            .filter(line => line.trim())
            .map(line => {
                // Formato esperado: http://username:password@host:port
                const url = line.trim();
                const match = url.match(/http:\/\/(.*?):(.*?)@(.*)/);
                if (match) {
                    const [_, username, password, host] = match;
                    // Construir la URL con las credenciales incluidas
                    return {
                        url: `http://${username}:${password}@${host}`
                    };
                }
                return { url };
            });
        return proxyList;
    } catch (error) {
        console.warn('No se pudo cargar la lista de proxies:', error);
        return [];
    }
};

const getRandomProxy = (proxies: ProxyConfig[]): ProxyConfig | null => {
    if (!proxies.length) return null;
    return proxies[Math.floor(Math.random() * proxies.length)];
};

async function scrapeWithoutProxy() {
    let browser;
    try {
        const browserOptions: any = {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920,1080'
            ]
        };

        console.log('Iniciando navegador sin proxy...');
        browser = await puppeteer.launch(browserOptions);
        const page = await browser.newPage();

        // Configurar viewport y user agent
        await page.setViewport({ width: 1920, height: 1080 });
        await page.setUserAgent(randomUseragent.getRandom());

        // Configurar headers
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'es-ES,es;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Referer': 'https://www.google.com/'
        });

        // Delay aleatorio antes de navegar
        await delay(getRandomDelay(2000, 5000));

        console.log('Navegando a la página...');
        await page.goto('https://www.loteriasyapuestas.es/es', {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        // Esperar a que los elementos estén cargados
        await page.waitForSelector('.c-parrilla-juegos__elemento_topaz', { timeout: 10000 });

        console.log('Extrayendo datos de botes...');
        const botes = await page.evaluate(() => {
            const result: { [key: string]: string } = {};

            const getBoteText = (element: Element, gameId: string) => {
                try {
                    const cantidadElement = element.querySelector(`p[class*="cantidad"][class*="${gameId}"]`);
                    const millonesElement = element.querySelector(`p[class*="millones"][class*="${gameId}"]`);

                    if (cantidadElement && millonesElement) {
                        const cantidad = cantidadElement.textContent?.trim() || '';
                        return `${cantidad} MILLONES`;
                    }

                    const cantidadSpecial = element.querySelector(`p[class*="cantidad"][class*="${gameId}"]`);
                    if (cantidadSpecial) {
                        const cantidad = cantidadSpecial.textContent?.trim() || '';
                        const tipoElement = element.querySelector(`p[class*="tipo-premio"][class*="${gameId}"]`);
                        const tipo = tipoElement?.textContent?.trim() || '';
                        const euroSymbol = element.querySelector(`span[class*="simbolo-euro"]`)?.textContent || '€';

                        return tipo ? `${cantidad}${euroSymbol} ${tipo}` : `${cantidad}${euroSymbol}`;
                    }

                    return null;
                } catch (error) {
                    console.error(`Error extrayendo bote para ${gameId}:`, error);
                    return null;
                }
            };

            const games = {
                'euromillones': 'EMIL',
                'primitiva': 'LAPR',
                'bonoloto': 'BONO',
                'gordo': 'ELGR',
                'lototurf': 'LOTU',
                'eurodreams': 'EDMS',
                'loterianacional': 'LNAC'
            };

            document.querySelectorAll('.c-parrilla-juegos__elemento_topaz').forEach((element) => {
                for (const [key, id] of Object.entries(games)) {
                    if (element.querySelector(`.semicirculo--${id}_topaz`)) {
                        const bote = getBoteText(element, id);
                        if (bote) {
                            result[key] = bote;
                            console.log(`Bote extraído para ${key}:`, bote);
                        }
                    }
                }
            });

            if (!result['eurodreams']) result['eurodreams'] = '20.000€ AL MES DURANTE 30 AÑOS';
            if (!result['loterianacional']) result['loterianacional'] = '300.000€ 1ER PREMIO A LA SERIE';

            return result;
        });

        console.log('Botes obtenidos:', botes);

        // Guardar los datos en src/assets
        const assetsDir = path.join(__dirname, '..', 'src', 'assets');
        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
        }

        const outputPath = path.join(assetsDir, 'botes.json');
        fs.writeFileSync(outputPath, JSON.stringify(botes, null, 2));
        console.log('Datos guardados en:', outputPath);

        // Guardar también en dist/tienda-web-loto-ai/browser/assets
        const distAssetsDir = path.join(__dirname, '..', 'dist', 'tienda-web-loto-ai', 'browser', 'assets');
        if (fs.existsSync(distAssetsDir)) {
            const distOutputPath = path.join(distAssetsDir, 'botes.json');
            fs.writeFileSync(distOutputPath, JSON.stringify(botes, null, 2));
            console.log('Datos guardados también en:', distOutputPath);
        } else {
            console.warn('El directorio de distribución no existe:', distAssetsDir);
        }

        return botes;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function scrapeWithRetry(maxRetries = 5) {
    console.log('Iniciando scraping de botes...');

    // Primer intento sin proxy
    try {
        console.log('Intentando sin proxy primero...');
        return await scrapeWithoutProxy();
    } catch (error) {
        console.log('Intento sin proxy falló, probando con proxies...');

        const proxies = loadProxies();
        if (proxies.length > 0) {
            for (let attempt = 1; attempt <= maxRetries - 1; attempt++) {
                // ... intentos con proxy ...
            }
        }

        // Si todo falla, esperar y reintentar sin proxy
        console.log('Esperando 5 minutos antes de reintentar sin proxy...');
        await delay(300000); // 5 minutos
        return await scrapeWithoutProxy();
    }
}

scrapeWithRetry()
    .then(() => {
        console.log('Proceso completado exitosamente');
        process.exit(0);
    })
    .catch((error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error final:', errorMessage);
        process.exit(1);
    });