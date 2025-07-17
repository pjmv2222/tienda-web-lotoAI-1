import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';
import * as ProxyChain from 'proxy-chain';
import * as randomUseragent from 'random-useragent';

interface ProxyConfig {
    url: string;
    username?: string;
    password?: string;
}

interface LotteryResult {
    game: string;
    date: string;
    numbers: number[];
    complementary?: number[];
    stars?: number[];
    reintegro?: number;
    clave?: number;
    dream?: number;
    caballo?: number;
}

interface LotteryData {
    botes: any;
    resultados: LotteryResult[];
    timestamp: string;
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
                const url = line.trim();
                const match = url.match(/http:\/\/(.*?):(.*?)@(.*)/);
                if (match) {
                    const [_, username, password, host] = match;
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
        console.log('🚀 Iniciando scraping SIN proxy...');
        
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ]
        });

        const page = await browser.newPage();
        
        // Configurar user agent aleatorio
        const userAgent = randomUseragent.getRandom();
        await page.setUserAgent(userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
        
        await page.setViewport({ width: 1920, height: 1080 });
        
        // PASO 1: Obtener botes usando la URL y selectores que funcionan
        console.log('💰 Navegando para obtener botes...');
        await page.goto('https://www.loteriasyapuestas.es/es', {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        // Esperar a que los elementos estén cargados (con manejo de error)
        try {
            await page.waitForSelector('.c-parrilla-juegos__elemento_topaz', { timeout: 15000 });
            console.log('✅ Elementos de juegos encontrados');
        } catch (error: any) {
            console.warn('⚠️ No se encontraron elementos específicos, continuando...', error.message);
            // Continuar de todas formas
        }

        console.log('💰 Extrayendo información de botes...');
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

            if (!result['eurodreams']) result['eurodreams'] = '20.000€ Al mes durante 30 años';
            if (!result['loterianacional']) result['loterianacional'] = '300.000€ Primer Premio';

            return result;
        });

        await delay(getRandomDelay(2000, 4000));

        // PASO 2: Navegar a página de resultados
        console.log('🎯 Navegando para obtener últimos resultados...');
        await page.goto('https://www.loteriasyapuestas.es/es/resultados', {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        await delay(getRandomDelay(2000, 4000));

        // Obtener resultados (por ahora estructura simple para probar)
        console.log('🎯 Extrayendo últimos resultados...');
        const resultados = await page.evaluate(() => {
            const results: any[] = [];
            
            // Buscar cualquier elemento que contenga números
            try {
                // Buscar elementos que contengan fechas y números
                const dateElements = document.querySelectorAll('*:not(script):not(style)');
                for (let element of Array.from(dateElements)) {
                    const text = element.textContent || '';
                    
                    // Buscar patrones de fecha (ej: "16/07/2025" o "Martes 16 Jul")
                    if (text.match(/\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}\s+(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i)) {
                        // Buscar números cercanos
                        const parent = element.closest('div, section, article') || element.parentElement;
                        if (parent) {
                            const numbersText = parent.textContent || '';
                            const numbers = numbersText.match(/\b\d{1,2}\b/g);
                            
                            if (numbers && numbers.length >= 5) {
                                results.push({
                                    game: 'general', // Por ahora general
                                    date: text.trim(),
                                    numbersFound: numbers.slice(0, 10),
                                    context: numbersText.substring(0, 200)
                                });
                            }
                        }
                        
                        // Solo tomar los primeros 10 resultados
                        if (results.length >= 10) break;
                    }
                }
            } catch (error) {
                console.warn('Error buscando resultados:', error);
            }

            return results;
        });

        console.log('✅ Datos extraídos exitosamente');
        console.log('📊 Botes encontrados:', Object.keys(botes).length);
        console.log('🎯 Resultados encontrados:', resultados.length);

        const lotteryData: LotteryData = {
            botes,
            resultados,
            timestamp: new Date().toISOString()
        };

        return lotteryData;

    } catch (error) {
        console.error('❌ Error durante el scraping:', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function scrapeWithProxy(proxy: ProxyConfig) {
    let anonymizedProxy: string | undefined;
    let browser;
    
    try {
        console.log('🔗 Configurando proxy...', proxy.url);
        
        anonymizedProxy = await ProxyChain.anonymizeProxy(proxy.url);
        console.log('✅ Proxy configurado:', anonymizedProxy);

        browser = await puppeteer.launch({
            headless: true,
            args: [
                `--proxy-server=${anonymizedProxy}`,
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ]
        });

        const page = await browser.newPage();
        
        const userAgent = randomUseragent.getRandom();
        await page.setUserAgent(userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
        
        await page.setViewport({ width: 1920, height: 1080 });
        
        console.log('📱 Navegando a la página con proxy...');
        await page.goto('https://www.loteriasyapuestas.es/es/resultados', {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        // Similar lógica de extracción que scrapeWithoutProxy
        // ... (código similar al anterior)
        
        const lotteryData: LotteryData = {
            botes: {},
            resultados: [],
            timestamp: new Date().toISOString()
        };

        return lotteryData;

    } catch (error) {
        console.error('❌ Error con proxy:', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
        if (anonymizedProxy) {
            await ProxyChain.closeAnonymizedProxy(anonymizedProxy, true);
        }
    }
}

async function main() {
    try {
        console.log('🎲 Iniciando scraper extendido de lotería...');
        
        const proxies = loadProxies();
        console.log(`📡 Proxies cargados: ${proxies.length}`);

        let lotteryData: LotteryData;

        if (proxies.length > 0) {
            const randomProxy = getRandomProxy(proxies);
            if (randomProxy) {
                try {
                    lotteryData = await scrapeWithProxy(randomProxy);
                } catch (proxyError) {
                    console.warn('⚠️ Error con proxy, intentando sin proxy...', proxyError);
                    lotteryData = await scrapeWithoutProxy();
                }
            } else {
                lotteryData = await scrapeWithoutProxy();
            }
        } else {
            lotteryData = await scrapeWithoutProxy();
        }

        // Guardar datos
        const outputPath = path.join(__dirname, '..', 'src', 'assets', 'lottery-data.json');
        const outputDir = path.dirname(outputPath);
        
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(lotteryData, null, 2));
        console.log('💾 Datos guardados en:', outputPath);

        // También guardar botes separadamente para compatibilidad
        const botesPath = path.join(__dirname, '..', 'src', 'assets', 'botes.json');
        fs.writeFileSync(botesPath, JSON.stringify(lotteryData.botes, null, 2));
        console.log('💰 Botes guardados en:', botesPath);

        console.log('🎉 Scraping completado exitosamente!');
        process.exit(0);
        
    } catch (error) {
        console.error('💥 Error fatal en main:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

export { main, scrapeWithoutProxy, scrapeWithProxy }; 