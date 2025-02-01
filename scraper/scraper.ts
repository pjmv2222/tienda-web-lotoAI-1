// src/scripts/scraper.ts

import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

interface Botes {
    primitiva: string;
    bonoloto: string;
    euromillones: string;
    gordo: string;
}

interface Sorteo {
    game_id: string;
    premio_bote: string;
    estado: string;
}

function formatearBote(monto: string): string {
    const cantidad = parseInt(monto);
    if (cantidad >= 1000000) {
        const millones = Math.floor(cantidad / 1000000);
        return `${millones} MILLONES`;
    } else if (cantidad >= 1000) {
        const miles = (cantidad / 1000).toLocaleString('es-ES', { maximumFractionDigits: 0 });
        return `${miles} MIL`;
    }
    return cantidad.toLocaleString('es-ES');
}

const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0'
];

async function scrapeBotes(): Promise<void> {
    try {
        console.log('Iniciando scraping...');
        
        // Delay aleatorio entre 2 y 5 segundos
        const delay = Math.floor(Math.random() * 3000) + 2000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Seleccionar un User-Agent aleatorio
        const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
        
        const response = await axios.get('https://www.loteriasyapuestas.es/es/resultados', {
            headers: {
                'User-Agent': randomUserAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Cookie': '',  // La cookie se establecerá en la primera petición
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Cache-Control': 'max-age=0'
            },
            maxRedirects: 5,
            validateStatus: function (status) {
                return status >= 200 && status < 303;
            }
        });

        // Obtener cookies de la respuesta
        const cookies = response.headers['set-cookie'];
        
        // Esperar un poco antes de la segunda petición
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Segunda petición con las cookies obtenidas
        const dataResponse = await axios.get('https://www.loteriasyapuestas.es/servicios/proximosv3', {
            params: {
                game_id: 'TODOS',
                num: 2
            },
            headers: {
                'User-Agent': randomUserAgent,
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
                'Connection': 'keep-alive',
                'Referer': 'https://www.loteriasyapuestas.es/es/resultados',
                'Cookie': cookies ? cookies.join('; ') : '',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin'
            }
        });

        const botes: Botes = {
            primitiva: '',
            bonoloto: '',
            euromillones: '',
            gordo: ''
        };

        if (Array.isArray(dataResponse.data)) {
            dataResponse.data
                .filter((sorteo: Sorteo) => sorteo.estado === 'abierto' && sorteo.premio_bote)
                .forEach((sorteo: Sorteo) => {
                    const premio = formatearBote(sorteo.premio_bote);
                    console.log(`Procesando sorteo: ${sorteo.game_id} con premio: ${premio}`);
                    
                    switch (sorteo.game_id) {
                        case 'LAPR':
                            botes.primitiva = premio;
                            console.log('Primitiva actualizada:', premio);
                            break;
                        case 'BONO':
                            botes.bonoloto = premio;
                            console.log('Bonoloto actualizada:', premio);
                            break;
                        case 'EMIL':
                            botes.euromillones = premio;
                            console.log('Euromillones actualizado:', premio);
                            break;
                        case 'ELGR':
                            botes.gordo = premio;
                            console.log('Gordo actualizado:', premio);
                            break;
                    }
                });
        }

        Object.keys(botes).forEach(key => {
            if (!botes[key as keyof Botes]) {
                botes[key as keyof Botes] = '0';
            }
        });

        console.log('Botes encontrados:', botes);

        const assetsDir = path.join(__dirname, '..', 'src', 'assets');
        console.log('Directorio de assets:', assetsDir);
        
        if (!fs.existsSync(assetsDir)) {
            console.log('Creando directorio de assets...');
            fs.mkdirSync(assetsDir, { recursive: true });
        }

        const outputPath = path.join(assetsDir, 'botes.json');
        console.log('Guardando archivo en:', outputPath);
        fs.writeFileSync(outputPath, JSON.stringify(botes, null, 2));
        
        console.log('Botes actualizados correctamente en:', outputPath);
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error de red:', error.message);
            if (error.response) {
                console.error('Datos del error:', error.response.data);
            }
        } else {
            console.error('Error inesperado:', error);
        }
        process.exit(1);
    }
}

scrapeBotes();