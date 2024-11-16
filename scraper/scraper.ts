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

async function scrapeBotes(): Promise<void> {
    try {
        console.log('Iniciando scraping...');
        
        const response = await axios.get('https://www.loteriasyapuestas.es/servicios/proximosv3', {
            params: {
                game_id: 'TODOS',
                num: 2
            }
        });

        const botes: Botes = {
            primitiva: '',
            bonoloto: '',
            euromillones: '',
            gordo: ''
        };

        if (Array.isArray(response.data)) {
            response.data
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