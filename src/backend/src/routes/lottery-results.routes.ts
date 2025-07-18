import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const router = express.Router();

// Endpoint para obtener últimos resultados de lotería
router.get('/latest', async (req, res) => {
  try {
    // Ruta del archivo de datos generado por el scraper extendido
    const dataPath = path.join(__dirname, '../../../../src/assets/lottery-data.json');
    
    // Verificar si el archivo existe
    if (!fs.existsSync(dataPath)) {
      console.log('Archivo lottery-data.json no encontrado, usando datos de ejemplo');
      return res.status(200).json({
        success: true,
        data: getExampleData(),
        message: 'Datos de ejemplo - archivo de scraper no encontrado'
      });
    }

    // Leer datos del archivo
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const lotteryData = JSON.parse(rawData);

    // Transformar datos al formato esperado por el frontend
    const transformedResults = transformLotteryData(lotteryData);

    res.status(200).json({
      success: true,
      data: transformedResults,
      lastUpdated: lotteryData.timestamp || new Date().toISOString()
    });

  } catch (error) {
    console.error('Error al obtener resultados de lotería:', error);
    
    // En caso de error, devolver datos de ejemplo
    res.status(200).json({
      success: true,
      data: getExampleData(),
      message: 'Datos de ejemplo - error al leer archivo de scraper'
    });
  }
});

// Endpoint para obtener solo los botes
router.get('/jackpots', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../../../../src/assets/botes.json');
    
    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({
        success: false,
        message: 'Archivo de botes no encontrado'
      });
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const botesData = JSON.parse(rawData);

    res.status(200).json({
      success: true,
      data: botesData,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error al obtener botes:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Función para transformar datos del scraper al formato del frontend
function transformLotteryData(scrapedData: any) {
  const results: any[] = [];
  
  // Procesar resultados del scraper extendido
  if (scrapedData.resultados && Array.isArray(scrapedData.resultados)) {
    scrapedData.resultados.forEach((resultado: any) => {
      const transformedResult: any = {
        juego: resultado.game,
        nombreJuego: getGameDisplayName(resultado.game),
        fecha: resultado.date || new Date().toISOString().split('T')[0],
        sorteo: 'Sorteo actual',
        numeros: resultado.numbers || []
      };

      // Agregar campos específicos según el juego
      if (resultado.stars) transformedResult.estrellas = resultado.stars;
      if (resultado.millon) transformedResult.millon = resultado.millon;
      if (resultado.joker) transformedResult.joker = resultado.joker;
      if (resultado.complementary) transformedResult.complementario = resultado.complementary;
      if (resultado.reintegro) transformedResult.reintegro = resultado.reintegro;
      if (resultado.clave) transformedResult.clave = resultado.clave;
      if (resultado.dream) transformedResult.dream = resultado.dream;
      if (resultado.caballo) transformedResult.caballo = resultado.caballo;
      if (resultado.premios) transformedResult.premios = resultado.premios;

      results.push(transformedResult);
    });
  }

  return results;
}

// Función para obtener nombre de juego en formato display
function getGameDisplayName(game: string): string {
  const gameNames: { [key: string]: string } = {
    'euromillones': 'EuroMillones',
    'primitiva': 'La Primitiva',
    'bonoloto': 'Bonoloto',
    'elgordo': 'El Gordo de la Primitiva',
    'eurodreams': 'EuroDreams',
    'lototurf': 'Lototurf',
    'loterianacional': 'Lotería Nacional'
  };
  
  return gameNames[game] || game;
}

// Datos de ejemplo para fallback
function getExampleData() {
  return [
    {
      juego: 'euromillones',
      nombreJuego: 'EuroMillones',
      fecha: '2025-07-18',
      sorteo: 'Sorteo actual',
      numeros: [7, 12, 18, 33, 42],
      estrellas: [3, 8],
      millon: 'ABC12345'
    },
    {
      juego: 'primitiva',
      nombreJuego: 'La Primitiva',
      fecha: '2025-07-18',
      sorteo: 'Sorteo actual',
      numeros: [5, 14, 23, 31, 45, 49],
      joker: '1234567'
    }
  ];
}

export default router; 