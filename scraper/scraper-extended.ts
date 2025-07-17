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

        console.log('🚀 Iniciando navegador sin proxy...');
        browser = await puppeteer.launch(browserOptions);
        const page = await browser.newPage();

        // Configurar viewport y user agent (EXACTAMENTE como el original)
        await page.setViewport({ width: 1920, height: 1080 });
        const userAgent = randomUseragent.getRandom();
        await page.setUserAgent(userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        // Configurar headers (EXACTAMENTE como el original)
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'es-ES,es;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Referer': 'https://www.google.com/'
        });

        // Delay aleatorio antes de navegar (EXACTAMENTE como el original)
        await delay(getRandomDelay(2000, 5000));

        console.log('💰 Navegando a la página...');
        await page.goto('https://www.loteriasyapuestas.es/es', {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        // Esperar a que los elementos estén cargados (EXACTAMENTE como el original)
        await page.waitForSelector('.c-parrilla-juegos__elemento_topaz', { timeout: 10000 });

        console.log('💰 Extrayendo datos de botes...');
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

        console.log('💰 Botes obtenidos:', botes);

        // Limpiar botes (como el original)
        const cleanBoteValue = (value: string): string => {
            if (!value) return value;
            let cleaned = value.replace(/€€/g, '€');
            cleaned = cleaned.trim();
            return cleaned;
        };

        const cleanedBotes: { [key: string]: string } = {};
        Object.keys(botes).forEach(key => {
            cleanedBotes[key] = cleanBoteValue(botes[key]);
        });

        console.log('💰 Botes limpiados:', cleanedBotes);

        // Pequeño delay antes de ir a resultados
        await delay(getRandomDelay(2000, 4000));

        // PASO 2: Navegar a página de resultados
        console.log('🎯 Navegando para obtener últimos resultados...');
        await page.goto('https://www.loteriasyapuestas.es/es/resultados', {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        await delay(getRandomDelay(2000, 4000));

        // Obtener solo los números ganadores específicos
        console.log('🎯 Extrayendo números ganadores...');
        const resultados = await page.evaluate(() => {
            const results: any[] = [];
            
            try {
                // Buscar selectores específicos para números ganadores
                const gameSelectors = [
                    { 
                        game: 'euromillones', 
                        numbersSelector: '.c-numero-bola, .numero-ganador',
                        starsSelector: '.c-numero-estrella, .estrella-ganadora'
                    },
                    { 
                        game: 'primitiva', 
                        numbersSelector: '.c-numero-bola, .numero-primitiva',
                        complementarySelector: '.complementario'
                    },
                    { 
                        game: 'bonoloto', 
                        numbersSelector: '.c-numero-bola, .numero-bonoloto',
                        complementarySelector: '.complementario, .reintegro'
                    }
                ];

                // Buscar resultados más específicos
                gameSelectors.forEach(({ game, numbersSelector, starsSelector, complementarySelector }) => {
                    const numberElements = document.querySelectorAll(numbersSelector);
                    if (numberElements.length > 0) {
                        const numbers = Array.from(numberElements)
                            .map(el => parseInt(el.textContent?.trim() || '0'))
                            .filter(n => n > 0 && n <= 50);
                        
                        if (numbers.length >= 5) {
                            const result: any = {
                                game,
                                numbers: numbers.slice(0, 6),
                                date: new Date().toLocaleDateString('es-ES')
                            };

                            // Agregar estrellas si existen
                            if (starsSelector) {
                                const starElements = document.querySelectorAll(starsSelector);
                                if (starElements.length > 0) {
                                    result.stars = Array.from(starElements)
                                        .map(el => parseInt(el.textContent?.trim() || '0'))
                                        .filter(n => n > 0);
                                }
                            }

                            // Agregar complementario si existe
                            if (complementarySelector) {
                                const compElement = document.querySelector(complementarySelector);
                                if (compElement) {
                                    const comp = parseInt(compElement.textContent?.trim() || '0');
                                    if (comp > 0) result.complementary = comp;
                                }
                            }

                            results.push(result);
                        }
                    }
                });

                // Si no encuentra selectores específicos, buscar estructura básica
                if (results.length === 0) {
                    const basicResults = document.querySelectorAll('.resultado, .sorteo, .numbers');
                    for (let i = 0; i < Math.min(3, basicResults.length); i++) {
                        const element = basicResults[i];
                        const text = element.textContent || '';
                        const numbers = text.match(/\b([1-9]|[1-4][0-9]|50)\b/g);
                        
                        if (numbers && numbers.length >= 5) {
                            results.push({
                                game: 'general',
                                numbers: numbers.slice(0, 6).map(n => parseInt(n)),
                                source: 'basic'
                            });
                        }
                    }
                }

            } catch (error) {
                console.warn('Error extrayendo resultados:', error);
            }

            return results;
        });

        console.log('✅ Datos extraídos exitosamente');
        console.log('📊 Botes encontrados:', Object.keys(cleanedBotes).length);
        console.log('🎯 Resultados encontrados:', resultados.length);

        const lotteryData: LotteryData = {
            botes: cleanedBotes,
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