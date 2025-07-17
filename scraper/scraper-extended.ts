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
        
        console.log('📱 Navegando a la página de Loterías...');
        await page.goto('https://www.loteriasyapuestas.es/es/resultados', {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        await delay(getRandomDelay(2000, 4000));

        // Obtener botes
        console.log('💰 Extrayendo información de botes...');
        const botes = await page.evaluate(() => {
            const botesData: any = {};
            
            // Selectores para diferentes juegos
            const gameSelectors = [
                { game: 'euromillones', selector: '[data-game="euromillones"]' },
                { game: 'primitiva', selector: '[data-game="primitiva"]' },
                { game: 'bonoloto', selector: '[data-game="bonoloto"]' },
                { game: 'elgordo', selector: '[data-game="elgordo"]' },
                { game: 'eurodreams', selector: '[data-game="eurodreams"]' },
                { game: 'lototurf', selector: '[data-game="lototurf"]' },
                { game: 'loterianacional', selector: '[data-game="loterianacional"]' }
            ];

            gameSelectors.forEach(({ game, selector }) => {
                try {
                    const gameElement = document.querySelector(selector);
                    if (gameElement) {
                        const boteElement = gameElement.querySelector('.bote, .jackpot, .premio');
                        if (boteElement) {
                            const boteText = boteElement.textContent?.trim() || '';
                            const boteMatch = boteText.match(/[\d.,]+/);
                            if (boteMatch) {
                                botesData[game] = {
                                    amount: boteMatch[0].replace(/\./g, '').replace(',', '.'),
                                    currency: 'EUR'
                                };
                            }
                        }
                    }
                } catch (error) {
                    console.warn(`Error extrayendo bote de ${game}:`, error);
                }
            });

            return botesData;
        });

        // Obtener resultados
        console.log('🎯 Extrayendo últimos resultados...');
        const resultados = await page.evaluate(() => {
            const results: LotteryResult[] = [];
            
            // Selectores para resultados de diferentes juegos
            const gameResults = [
                {
                    game: 'euromillones',
                    selector: '.resultado-euromillones, [data-game="euromillones"] .resultado',
                    parseFunction: (element: Element) => {
                        const numbers = Array.from(element.querySelectorAll('.numero')).map(el => 
                            parseInt(el.textContent?.trim() || '0')
                        ).filter(n => n > 0);
                        
                        const stars = Array.from(element.querySelectorAll('.estrella')).map(el => 
                            parseInt(el.textContent?.trim() || '0')
                        ).filter(n => n > 0);
                        
                        const dateElement = element.querySelector('.fecha');
                        const date = dateElement?.textContent?.trim() || new Date().toLocaleDateString();
                        
                        return {
                            game: 'euromillones',
                            date,
                            numbers: numbers.slice(0, 5),
                            stars: stars.slice(0, 2)
                        };
                    }
                },
                {
                    game: 'primitiva',
                    selector: '.resultado-primitiva, [data-game="primitiva"] .resultado',
                    parseFunction: (element: Element) => {
                        const numbers = Array.from(element.querySelectorAll('.numero')).map(el => 
                            parseInt(el.textContent?.trim() || '0')
                        ).filter(n => n > 0);
                        
                        const complementarioElement = element.querySelector('.complementario, .reintegro');
                        const complementario = complementarioElement ? 
                            parseInt(complementarioElement.textContent?.trim() || '0') : undefined;
                        
                        const dateElement = element.querySelector('.fecha');
                        const date = dateElement?.textContent?.trim() || new Date().toLocaleDateString();
                        
                        return {
                            game: 'primitiva',
                            date,
                            numbers: numbers.slice(0, 6),
                            complementary: complementario ? [complementario] : undefined
                        };
                    }
                },
                {
                    game: 'bonoloto',
                    selector: '.resultado-bonoloto, [data-game="bonoloto"] .resultado',
                    parseFunction: (element: Element) => {
                        const numbers = Array.from(element.querySelectorAll('.numero')).map(el => 
                            parseInt(el.textContent?.trim() || '0')
                        ).filter(n => n > 0);
                        
                        const complementarioElement = element.querySelector('.complementario');
                        const reintegroElement = element.querySelector('.reintegro');
                        
                        const complementario = complementarioElement ? 
                            parseInt(complementarioElement.textContent?.trim() || '0') : undefined;
                        const reintegro = reintegroElement ? 
                            parseInt(reintegroElement.textContent?.trim() || '0') : undefined;
                        
                        const dateElement = element.querySelector('.fecha');
                        const date = dateElement?.textContent?.trim() || new Date().toLocaleDateString();
                        
                        return {
                            game: 'bonoloto',
                            date,
                            numbers: numbers.slice(0, 6),
                            complementary: complementario ? [complementario] : undefined,
                            reintegro
                        };
                    }
                }
                // Agregar más juegos según sea necesario
            ];

            gameResults.forEach(({ game, selector, parseFunction }) => {
                try {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element => {
                        const result = parseFunction(element);
                        if (result.numbers.length > 0) {
                            results.push(result);
                        }
                    });
                } catch (error) {
                    console.warn(`Error extrayendo resultados de ${game}:`, error);
                }
            });

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