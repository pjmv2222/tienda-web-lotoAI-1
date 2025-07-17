const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Endpoint para obtener últimos resultados de lotería
router.get('/latest', async (req, res) => {
  try {
    // Ruta del archivo de datos generado por el scraper
    const dataPath = path.join(__dirname, '../../../scraper/lottery-data.json');
    
    // Verificar si el archivo existe
    if (!fs.existsSync(dataPath)) {
      console.log('Archivo lottery-data.json no encontrado, creando datos de ejemplo');
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
      lastUpdated: new Date().toISOString()
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
    const dataPath = path.join(__dirname, '../../../scraper/botes.json');
    
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
function transformLotteryData(scrapedData) {
  const results = [];
  
  // Procesar cada juego
  if (scrapedData.euromillones) {
    results.push({
      juego: 'euromillones',
      nombreJuego: 'EuroMillones',
      fecha: scrapedData.euromillones.fecha || new Date().toISOString().split('T')[0],
      sorteo: scrapedData.euromillones.sorteo || 'Sorteo actual',
      numeros: scrapedData.euromillones.numeros || [],
      estrellas: scrapedData.euromillones.estrellas || [],
      millon: scrapedData.euromillones.millon || null
    });
  }

  if (scrapedData.primitiva) {
    results.push({
      juego: 'primitiva',
      nombreJuego: 'La Primitiva',
      fecha: scrapedData.primitiva.fecha || new Date().toISOString().split('T')[0],
      sorteo: scrapedData.primitiva.sorteo || 'Sorteo actual',
      numeros: scrapedData.primitiva.numeros || [],
      complementario: scrapedData.primitiva.complementario || null,
      reintegro: scrapedData.primitiva.reintegro || null,
      joker: scrapedData.primitiva.joker || null
    });
  }

  if (scrapedData.bonoloto) {
    results.push({
      juego: 'bonoloto',
      nombreJuego: 'Bonoloto',
      fecha: scrapedData.bonoloto.fecha || new Date().toISOString().split('T')[0],
      sorteo: scrapedData.bonoloto.sorteo || 'Sorteo actual',
      numeros: scrapedData.bonoloto.numeros || [],
      complementario: scrapedData.bonoloto.complementario || null,
      reintegro: scrapedData.bonoloto.reintegro || null
    });
  }

  if (scrapedData.elgordo) {
    results.push({
      juego: 'elgordo',
      nombreJuego: 'El Gordo de la Primitiva',
      fecha: scrapedData.elgordo.fecha || new Date().toISOString().split('T')[0],
      sorteo: scrapedData.elgordo.sorteo || 'Sorteo actual',
      numeros: scrapedData.elgordo.numeros || [],
      clave: scrapedData.elgordo.clave || null
    });
  }

  if (scrapedData.eurodreams) {
    results.push({
      juego: 'eurodreams',
      nombreJuego: 'EuroDreams',
      fecha: scrapedData.eurodreams.fecha || new Date().toISOString().split('T')[0],
      sorteo: scrapedData.eurodreams.sorteo || 'Sorteo actual',
      numeros: scrapedData.eurodreams.numeros || [],
      dream: scrapedData.eurodreams.dream || null
    });
  }

  if (scrapedData.lototurf) {
    results.push({
      juego: 'lototurf',
      nombreJuego: 'Lototurf',
      fecha: scrapedData.lototurf.fecha || new Date().toISOString().split('T')[0],
      sorteo: scrapedData.lototurf.sorteo || 'Sorteo actual',
      numeros: scrapedData.lototurf.numeros || [],
      reintegro: scrapedData.lototurf.reintegro || null,
      caballo: scrapedData.lototurf.caballo || null
    });
  }

  if (scrapedData.loterianacional) {
    results.push({
      juego: 'loterianacional',
      nombreJuego: 'Lotería Nacional',
      fecha: scrapedData.loterianacional.fecha || new Date().toISOString().split('T')[0],
      sorteo: scrapedData.loterianacional.sorteo || 'Sorteo actual',
      numeros: scrapedData.loterianacional.numeros || [],
      numero: scrapedData.loterianacional.numero || '',
      reintegro: scrapedData.loterianacional.reintegro || null
    });
  }

  return results;
}

// Datos de ejemplo para fallback
function getExampleData() {
  return [
    {
      juego: 'euromillones',
      nombreJuego: 'EuroMillones',
      fecha: '2024-01-16',
      sorteo: 'Sorteo 006/2024',
      numeros: [7, 12, 18, 33, 42],
      estrellas: [3, 8],
      millon: 'ABC12345'
    },
    {
      juego: 'primitiva',
      nombreJuego: 'La Primitiva',
      fecha: '2024-01-15',
      sorteo: 'Sorteo 005/2024',
      numeros: [5, 14, 23, 31, 45, 49],
      complementario: 12,
      reintegro: 7,
      joker: '1234567'
    },
    {
      juego: 'bonoloto',
      nombreJuego: 'Bonoloto',
      fecha: '2024-01-16',
      sorteo: 'Sorteo 012/2024',
      numeros: [2, 11, 19, 28, 35, 44],
      complementario: 8,
      reintegro: 3
    },
    {
      juego: 'elgordo',
      nombreJuego: 'El Gordo de la Primitiva',
      fecha: '2024-01-14',
      sorteo: 'Sorteo 002/2024',
      numeros: [9, 17, 26, 38, 51],
      clave: 4
    },
    {
      juego: 'eurodreams',
      nombreJuego: 'EuroDreams',
      fecha: '2024-01-15',
      sorteo: 'Sorteo 015/2024',
      numeros: [6, 13, 22, 29, 37, 40],
      dream: 2
    },
    {
      juego: 'lototurf',
      nombreJuego: 'Lototurf',
      fecha: '2024-01-16',
      sorteo: 'Sorteo 012/2024',
      numeros: [3, 8, 12, 15, 18, 20],
      reintegro: 9,
      caballo: 6
    },
    {
      juego: 'loterianacional',
      nombreJuego: 'Lotería Nacional',
      fecha: '2024-01-13',
      sorteo: 'Sorteo 004/2024',
      numeros: [85734],
      numero: '85734',
      reintegro: 4
    }
  ];
}

module.exports = router; 