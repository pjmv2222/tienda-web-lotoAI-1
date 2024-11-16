// src/scripts/scraper.ts

const axios = require('axios');
const fs = require('fs');
const path = require('path');

interface Botes {
    primitiva: string;
    bonoloto: string;
    euromillones: string;
    gordo: string;
    [key: string]: string;
}

interface Sorteo {
    game_id: string;
    premio_bote: string;
    estado: string;
}

interface AxiosError {
    message: string;
    response?: {
        data: any;
    };
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

async function scrapeBotes() {
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

        (Object.keys(botes) as Array<keyof Botes>).forEach(key => {
            if (!botes[key]) {
                botes[key] = "0";
            }
        });

        console.log('Botes encontrados:', botes);

        const assetsDir = path.join(process.cwd(), '..', 'src', 'assets');
        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
        }

        const outputPath = path.join(assetsDir, 'botes.json');
        fs.writeFileSync(outputPath, JSON.stringify(botes, null, 2));
        
        console.log('Botes actualizados correctamente en:', outputPath);
        
    } catch (err: unknown) {
        if (err instanceof Error) {
            const error = err as Error & { response?: { data: any } };
            if (axios.isAxiosError(error)) {
                console.error('Error de red:', error.message);
                if (error.response) {
                    console.error('Datos del error:', error.response.data);
                }
            } else {
                console.error('Error inesperado:', error.message);
            }
        } else {
            console.error('Error desconocido');
        }
        process.exit(1);
    }
}

scrapeBotes();