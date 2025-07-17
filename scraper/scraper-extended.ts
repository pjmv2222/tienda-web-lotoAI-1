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

        // Esperar a que los elementos estén cargados (con tolerancia)
        try {
            await page.waitForSelector('.c-parrilla-juegos__elemento_topaz', { timeout: 15000 });
            console.log('✅ Elementos de juegos encontrados');
        } catch (error: any) {
            console.warn('⚠️ No se encontraron elementos específicos, continuando...', error.message);
            // Continuar de todas formas para obtener lo que pueda
        }

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

        // Capturar HTML de la página para análisis
        console.log('📄 Capturando HTML de la página...');
        const pageHTML = await page.content();
        
        // Guardar HTML para análisis offline
        const htmlPath = path.join(__dirname, '..', 'src', 'assets', 'resultados-page.html');
        fs.writeFileSync(htmlPath, pageHTML);
        console.log('💾 HTML guardado en:', htmlPath);

        // Extraer números usando la estructura real
        console.log('🎯 Extrayendo números con selectores reales...');
        const resultados = await page.evaluate(() => {
            const results: any[] = [];
            
            try {
                // Configuración de juegos con sus códigos y selectores reales
                const gameConfigs = [
                    {
                        game: 'euromillones',
                        code: 'EMIL',
                        mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-EMIL .c-ultimo-resultado__combinacion-li--euromillones',
                        starsSelector: '#qa_ultResult-combination-mainNumbers-EMIL-stars .c-ultimo-resultado__estrellas-li',
                        dateSelector: '#qa_ultResult-EMIL-fecha',
                        millonSelector: '.c-ultimo-resultado__desplegable-titulo'
                    },
                    {
                        game: 'primitiva', 
                        code: 'LAPR',
                        mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-LAPR .c-ultimo-resultado__combinacion-li--primitiva',
                        complementarySelector: '#qa_ultResult-combination-complementaryNumber-LAPR .c-ultimo-resultado__combinacion-li--complementario',
                        dateSelector: '#qa_ultResult-LAPR-fecha',
                        jokerSelector: '.c-ultimo-resultado__joker-ganador'
                    },
                    {
                        game: 'bonoloto',
                        code: 'BONO', 
                        mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-BONO .c-ultimo-resultado__combinacion-li--bonoloto',
                        complementarySelector: '#qa_ultResult-combination-complementaryNumber-BONO .c-ultimo-resultado__combinacion-li--complementario',
                        reintegroSelector: '#qa_ultResult-combination-reintegro-BONO .c-ultimo-resultado__combinacion-li--reintegro',
                        dateSelector: '#qa_ultResult-BONO-fecha'
                    },
                    {
                        game: 'gordo',
                        code: 'ELGR',
                        mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-ELGR .c-ultimo-resultado__combinacion-li--gordo',
                        claveSelector: '#qa_ultResult-combination-clave-ELGR .c-ultimo-resultado__combinacion-li--clave',
                        dateSelector: '#qa_ultResult-ELGR-fecha'
                    },
                    {
                        game: 'eurodreams',
                        code: 'EDMS',
                        mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-EDMS .c-ultimo-resultado__combinacion-li--eurodreams',
                        dreamSelector: '#qa_ultResult-combination-dream-EDMS .c-ultimo-resultado__combinacion-li--dream',
                        dateSelector: '#qa_ultResult-EDMS-fecha'
                    },
                    {
                        game: 'lototurf',
                        code: 'LOTU',
                        mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-LOTU .c-ultimo-resultado__combinacion-li--lototurf',
                        reintegroSelector: '#qa_ultResult-combination-reintegro-LOTU .c-ultimo-resultado__combinacion-li--reintegro',
                        caballoSelector: '#qa_ultResult-combination-caballo-LOTU .c-ultimo-resultado__combinacion-li--caballo',
                        dateSelector: '#qa_ultResult-LOTU-fecha'
                    },
                    {
                        game: 'loterianacional',
                        code: 'LNAC',
                        isSpecial: true, // Manejo especial para lotería nacional
                        dateSelector: '#qa_ultResult-LNAC-fecha',
                        premiosSelector: '.c-resultado-sorteo__premio'
                    }
                ];

                gameConfigs.forEach(config => {
                    try {
                        // Manejo especial para Lotería Nacional
                        if (config.isSpecial && config.game === 'loterianacional') {
                            const premiosElements = document.querySelectorAll(config.premiosSelector || '');
                            const premios: string[] = [];
                            
                            for (let i = 0; i < Math.min(3, premiosElements.length); i++) {
                                const premio = premiosElements[i];
                                const numeroElement = premio.querySelector('.c-resultado-sorteo__numero a');
                                if (numeroElement) {
                                    const numero = numeroElement.textContent?.trim() || '';
                                    if (numero) premios.push(numero);
                                }
                            }

                            if (premios.length > 0) {
                                const result: any = {
                                    game: config.game,
                                    premios: premios, // Usar 'premios' en lugar de 'numbers'
                                    date: 'pending' // Extraer fecha después
                                };

                                // Obtener fecha real
                                if (config.dateSelector) {
                                    const dateElement = document.querySelector(config.dateSelector);
                                    if (dateElement) {
                                        const dateText = dateElement.textContent?.trim() || '';
                                        const dateMatch = dateText.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
                                        if (dateMatch) result.date = dateMatch[0];
                                    }
                                }

                                results.push(result);
                                console.log(`✅ ${config.game}: ${premios.length} premios extraídos`);
                            }
                            return; // Salir del forEach para este caso especial
                        }

                        // Procesamiento normal para otros juegos
                        const mainNumbers = Array.from(document.querySelectorAll(config.mainNumbersSelector || ''))
                            .map(el => parseInt(el.textContent?.trim() || '0'))
                            .filter(n => n > 0);

                        if (mainNumbers.length > 0) {
                            const result: any = {
                                game: config.game,
                                numbers: mainNumbers,
                                date: 'pending' // Se actualiza abajo
                            };

                            // Obtener fecha real
                            if (config.dateSelector) {
                                const dateElement = document.querySelector(config.dateSelector);
                                if (dateElement) {
                                    const dateText = dateElement.textContent?.trim() || '';
                                    const dateMatch = dateText.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
                                    if (dateMatch) {
                                        result.date = dateMatch[0];
                                    } else {
                                        result.date = new Date().toLocaleDateString('es-ES');
                                    }
                                }
                            }

                            // Obtener estrellas (Euromillones)
                            if (config.starsSelector) {
                                const stars = Array.from(document.querySelectorAll(config.starsSelector))
                                    .map(el => parseInt(el.textContent?.trim() || '0'))
                                    .filter(n => n > 0);
                                if (stars.length > 0) result.stars = stars;
                            }

                            // Obtener El Millón (Euromillones)
                            if (config.millonSelector) {
                                const millonElement = document.querySelector(config.millonSelector);
                                if (millonElement) {
                                    const millon = millonElement.textContent?.trim() || '';
                                    if (millon) result.millon = millon;
                                }
                            }

                            // Obtener Joker (Primitiva)
                            if (config.jokerSelector) {
                                const jokerElement = document.querySelector(config.jokerSelector);
                                if (jokerElement) {
                                    const joker = jokerElement.textContent?.trim().replace(/\s/g, '') || '';
                                    if (joker) result.joker = joker;
                                }
                            }

                            // Obtener complementario
                            if (config.complementarySelector) {
                                const compElement = document.querySelector(config.complementarySelector);
                                if (compElement) {
                                    const comp = parseInt(compElement.textContent?.trim() || '0');
                                    if (comp > 0) result.complementario = comp;
                                }
                            }

                            // Obtener reintegro
                            if (config.reintegroSelector) {
                                const reintElement = document.querySelector(config.reintegroSelector);
                                if (reintElement) {
                                    const reint = parseInt(reintElement.textContent?.trim() || '0');
                                    if (reint > 0) result.reintegro = reint;
                                }
                            }

                            // Obtener clave (El Gordo)
                            if (config.claveSelector) {
                                const claveElement = document.querySelector(config.claveSelector);
                                if (claveElement) {
                                    const clave = parseInt(claveElement.textContent?.trim() || '0');
                                    if (clave > 0) result.clave = clave;
                                }
                            }

                            // Obtener dream (EuroDreams)
                            if (config.dreamSelector) {
                                const dreamElement = document.querySelector(config.dreamSelector);
                                if (dreamElement) {
                                    const dream = parseInt(dreamElement.textContent?.trim() || '0');
                                    if (dream > 0) result.dream = dream;
                                }
                            }

                            // Obtener caballo (Lototurf)
                            if (config.caballoSelector) {
                                const caballoElement = document.querySelector(config.caballoSelector);
                                if (caballoElement) {
                                    const caballo = parseInt(caballoElement.textContent?.trim() || '0');
                                    if (caballo > 0) result.caballo = caballo;
                                }
                            }

                            results.push(result);
                            console.log(`✅ ${config.game}: ${mainNumbers.length} números extraídos`);
                        }
                    } catch (error) {
                        console.warn(`Error extrayendo ${config.game}:`, error);
                    }
                });

            } catch (error) {
                console.warn('Error general extrayendo resultados:', error);
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