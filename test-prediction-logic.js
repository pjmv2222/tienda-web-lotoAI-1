const { Pool } = require('pg');

// Configuración de la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lotoia',
  password: 'postgres',
  port: 5432,
});

async function testPredictionLogic() {
  try {
    console.log('🧪 Iniciando prueba de lógica de predicciones...');
    
    // Usuario de prueba
    const userEmail = 'pjulianmv@gmail.com';
    
    // Obtener ID del usuario
    const userResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [userEmail]
    );
    
    if (userResult.rows.length === 0) {
      console.error('❌ Usuario no encontrado');
      return;
    }
    
    const userId = userResult.rows[0].id;
    console.log(`👤 Usuario encontrado: ID ${userId} (${userEmail})`);
    
    // Función para contar predicciones dinámicamente
    async function countPredictionsDynamic(userId, gameType) {
      const result = await pool.query(
        `SELECT COUNT(*) as count 
         FROM user_predictions 
         WHERE user_id = $1 AND game_type = $2`,
        [userId, gameType]
      );
      return parseInt(result.rows[0]?.count || '0');
    }
    
    // Función para obtener todos los conteos dinámicamente
    async function getAllCountsDynamic(userId) {
      const result = await pool.query(
        `SELECT 
          game_type, 
          COUNT(*) as count 
         FROM user_predictions 
         WHERE user_id = $1
         GROUP BY game_type`,
        [userId]
      );
      return result.rows;
    }
    
    // Probar conteo individual
    console.log('\n📊 Conteos individuales:');
    const games = ['euromillon', 'primitiva', 'bonoloto', 'elgordo', 'eurodreams', 'lototurf', 'loterianacional'];
    
    for (const game of games) {
      const count = await countPredictionsDynamic(userId, game);
      console.log(`  ${game}: ${count} predicciones`);
    }
    
    // Probar conteo general
    console.log('\n📈 Conteos generales:');
    const allCounts = await getAllCountsDynamic(userId);
    console.log('  Juegos con predicciones:', allCounts);
    
    // Simular el formato que esperará el frontend
    console.log('\n🎯 Formato para frontend:');
    const gameNames = {
      'euromillon': 'Euromillones',
      'primitiva': 'La Primitiva',
      'bonoloto': 'Bonoloto',
      'elgordo': 'El Gordo',
      'eurodreams': 'EuroDreams',
      'lototurf': 'Lototurf',
      'loterianacional': 'Lotería Nacional'
    };
    
    const gamesData = games.map(gameType => {
      const gameUsage = allCounts.find(c => c.game_type === gameType);
      const used = gameUsage ? parseInt(gameUsage.count) : 0;
      const maxAllowed = 3; // Plan básico
      
      return {
        game_id: gameType,
        game_name: gameNames[gameType] || gameType,
        total_allowed: maxAllowed,
        used: used,
        remaining: Math.max(0, maxAllowed - used)
      };
    });
    
    console.log('  Datos formateados:', JSON.stringify(gamesData, null, 2));
    
    console.log('\n✅ Prueba completada exitosamente');
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  } finally {
    await pool.end();
  }
}

// Ejecutar la prueba
testPredictionLogic(); 