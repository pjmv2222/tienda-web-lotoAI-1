// Actualizado: [fecha actual]

// src/scripts/scraper.ts

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

interface Botes {
    primitiva: string;
    bonoloto: string;
    euromillones: string;
    gordo: string;
    eurodreams: string;
    loterianacional: string;
    lototurf: string;
}

interface Sorteo {
    game_id: string;
    premio_bote: string;
    estado: string;
}

function formatearBote(monto: string): string {
    const cantidad = parseFloat(monto);
    if (cantidad >= 1000000) {
        const millones = (cantidad / 1000000).toLocaleString('es-ES', { 
            minimumFractionDigits: 1,
            maximumFractionDigits: 1 
        });
        return `${millones} MILLONES`;
    } else if (cantidad >= 1000) {
        const miles = (cantidad / 1000).toLocaleString('es-ES', { 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 
        });
        return `${miles} MIL`;
    }
    return cantidad.toLocaleString('es-ES');
}

const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0'
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeWithRetry(maxRetries = 3) {
    console.log('Iniciando scraping...');
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
            
            const response = await axios.get('https://www.loteriasyapuestas.es/es', {
                headers: {
                    'User-Agent': userAgent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                },
                timeout: 10000
            });

            const $ = cheerio.load(response.data);
            const botes: any = {};

            // Scraping de los botes
            $('.game-block').each((_, element) => {
                const gameElement = $(element);
                const gameTitle = gameElement.find('.game-name').text().trim().toLowerCase();
                const boteText = gameElement.find('.jackpot-amount').text().trim();

                // Mapear nombres de juegos
                let gameName = '';
                if (gameTitle.includes('primitiva')) gameName = 'primitiva';
                else if (gameTitle.includes('euromillones')) gameName = 'euromillones';
                else if (gameTitle.includes('bonoloto')) gameName = 'bonoloto';
                else if (gameTitle.includes('gordo')) gameName = 'gordo';
                else if (gameTitle.includes('lototurf')) gameName = 'lototurf';
                
                if (gameName && boteText) {
                    botes[gameName] = boteText;
                }
            });

            // Añadir valores fijos para juegos que no tienen bote variable
            botes['eurodreams'] = '20.000€ AL MES DURANTE 30 AÑOS';
            botes['loterianacional'] = '300.000€ 1ER PREMIO A LA SERIE';

            // Asegurarse de que el directorio existe
            const assetsDir = path.join(__dirname, '..', 'src', 'assets');
            if (!fs.existsSync(assetsDir)) {
                fs.mkdirSync(assetsDir, { recursive: true });
            }

            const outputPath = path.join(assetsDir, 'botes.json');
            console.log('Guardando datos en:', outputPath);
            
            // Guardar con formato legible
            fs.writeFileSync(outputPath, JSON.stringify(botes, null, 2));
            
            console.log('Datos guardados:', botes);
            console.log('Scraping completado con éxito en el intento', attempt);
            return;

        } catch (error: any) {
            console.log(`Intento ${attempt} fallido:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error(`Fallaron todos los intentos (${maxRetries})`);
            }
            
            const waitTime = Math.min(1000 * Math.pow(2, attempt), 10000);
            console.log(`Esperando ${waitTime}ms antes del siguiente intento...`);
            await delay(waitTime);
        }
    }
}

scrapeWithRetry()
    .then(() => {
        console.log('Proceso completado exitosamente');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error final:', error.message);
        process.exit(1);
    });