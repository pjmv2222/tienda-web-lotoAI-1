"use strict";
// src/scripts/scraper.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function formatearBote(monto) {
    const cantidad = parseInt(monto);
    if (cantidad >= 1000000) {
        const millones = Math.floor(cantidad / 1000000);
        return `${millones} MILLONES`;
    }
    else if (cantidad >= 1000) {
        const miles = (cantidad / 1000).toLocaleString('es-ES', { maximumFractionDigits: 0 });
        return `${miles} MIL`;
    }
    return cantidad.toLocaleString('es-ES');
}
async function scrapeBotes() {
    try {
        console.log('Iniciando scraping...');
        const response = await axios_1.default.get('https://www.loteriasyapuestas.es/servicios/proximosv3', {
            params: {
                game_id: 'TODOS',
                num: 2
            }
        });
        const botes = {
            primitiva: '',
            bonoloto: '',
            euromillones: '',
            gordo: ''
        };
        // Procesar los datos de la API
        if (Array.isArray(response.data)) {
            response.data
                .filter((sorteo) => sorteo.estado === 'abierto' && sorteo.premio_bote)
                .forEach((sorteo) => {
                const premio = formatearBote(sorteo.premio_bote);
                console.log(`Procesando sorteo: ${sorteo.game_id} con premio: ${premio}`);
                switch (sorteo.game_id) {
                    case 'LAPR': // La Primitiva
                        botes.primitiva = premio;
                        console.log('Primitiva actualizada:', premio);
                        break;
                    case 'BONO': // Bonoloto
                        botes.bonoloto = premio;
                        console.log('Bonoloto actualizada:', premio);
                        break;
                    case 'EMIL': // Euromillones
                        botes.euromillones = premio;
                        console.log('Euromillones actualizado:', premio);
                        break;
                    case 'ELGR': // El Gordo
                        botes.gordo = premio;
                        console.log('Gordo actualizado:', premio);
                        break;
                }
            });
        }
        // Convertir valores vacíos a "0"
        Object.keys(botes).forEach(key => {
            if (!botes[key]) {
                botes[key] = "0";
            }
        });
        console.log('Botes encontrados:', botes);
        const outputPath = path.join(process.cwd(), 'src', 'assets', 'botes.json');
        fs.writeFileSync(outputPath, JSON.stringify(botes, null, 2));
        console.log('Botes actualizados correctamente');
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Error de red:', error.message);
            if (error.response) {
                console.error('Datos del error:', error.response.data);
            }
        }
        else {
            console.error('Error inesperado:', error);
        }
        process.exit(1);
    }
}
scrapeBotes();
