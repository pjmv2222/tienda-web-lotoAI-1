import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeWithRetry(maxRetries = 3) {
    console.log('Iniciando scraping de botes...');
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        let browser;
        try {
            console.log('Iniciando navegador...');
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 1080 });
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36');

            console.log('Navegando a la página...');
            await page.goto('https://www.loteriasyapuestas.es/es', {
                waitUntil: 'networkidle0',
                timeout: 60000
            });

            await delay(5000);

            const botes = await page.evaluate(() => {
                const result: { [key: string]: string } = {};

                // Función para extraer el bote
                const getBoteText = (element: Element, gameId: string) => {
                    const cantidadElement = element.querySelector(`p[class*="cantidad"][class*="${gameId}"]`);
                    const millonesElement = element.querySelector(`p[class*="millones"][class*="${gameId}"]`);
                    
                    if (cantidadElement && millonesElement) {
                        const cantidad = cantidadElement.textContent?.trim() || '';
                        return `${cantidad} MILLONES`;
                    }
                    
                    // Para casos especiales como Eurodreams y Lotería Nacional
                    const cantidadSpecial = element.querySelector(`p[class*="cantidad"][class*="${gameId}"]`);
                    const tipoElement = element.querySelector(`p[class*="tipo-premio"][class*="${gameId}"]`);
                    
                    if (cantidadSpecial) {
                        const cantidad = cantidadSpecial.textContent?.trim() || '';
                        const tipo = tipoElement?.textContent?.trim() || '';
                        const euroSymbol = element.querySelector(`span[class*="simbolo-euro"]`)?.textContent || '€';
                        return tipo ? `${cantidad}${euroSymbol} ${tipo}` : `${cantidad}${euroSymbol}`;
                    }

                    return '0';
                };

                // Mapeo de juegos
                const games = {
                    'euromillones': 'EMIL',
                    'primitiva': 'LAPR',
                    'bonoloto': 'BONO',
                    'gordo': 'ELGR',
                    'lototurf': 'LOTU',
                    'eurodreams': 'EDMS',
                    'loterianacional': 'LNAC'
                };

                // Extraer botes
                document.querySelectorAll('.c-parrilla-juegos__elemento_topaz').forEach(element => {
                    for (const [key, id] of Object.entries(games)) {
                        if (element.querySelector(`.semicirculo--${id}_topaz`)) {
                            const bote = getBoteText(element, id);
                            if (bote !== '0') {
                                result[key] = bote;
                            }
                        }
                    }
                });

                // Valores por defecto para casos especiales
                if (!result['eurodreams']) result['eurodreams'] = '20.000€ AL MES DURANTE 30 AÑOS';
                if (!result['loterianacional']) result['loterianacional'] = '300.000€ 1ER PREMIO A LA SERIE';

                return result;
            });

            console.log('Datos extraídos:', botes);

            const assetsDir = path.join(__dirname, '..', 'src', 'assets');
            if (!fs.existsSync(assetsDir)) {
                fs.mkdirSync(assetsDir, { recursive: true });
            }

            const outputPath = path.join(assetsDir, 'botes.json');
            console.log('Guardando datos en:', outputPath);
            fs.writeFileSync(outputPath, JSON.stringify(botes, null, 2));
            
            console.log('Scraping completado con éxito en el intento', attempt);
            return;

        } catch (error) {
            console.log(`Intento ${attempt} fallido:`, error instanceof Error ? error.message : 'Error desconocido');
            
            if (attempt === maxRetries) {
                throw new Error(`Fallaron todos los intentos (${maxRetries})`);
            }
            
            const waitTime = Math.min(1000 * Math.pow(2, attempt), 10000);
            console.log(`Esperando ${waitTime}ms antes del siguiente intento...`);
            await delay(waitTime);
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    }
}

scrapeWithRetry()
    .then(() => {
        console.log('Proceso completado exitosamente');
        process.exit(0);
    })
    .catch((error: unknown) => {
        console.error('Error final:', error instanceof Error ? error.message : 'Error desconocido');
        process.exit(1);
    });