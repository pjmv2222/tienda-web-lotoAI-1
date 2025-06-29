// Controlador de suscripciones para PostgreSQL

// Obtener todas las suscripciones de un usuario
exports.getUserSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'Se requiere el ID del usuario' });
    }
    
    const client = await req.pgPool.connect();
    try {
      const queryText = `
        SELECT * FROM subscriptions
        WHERE user_id = $1
        ORDER BY created_at DESC
      `;
      
      const result = await client.query(queryText, [userId]);
      
      res.status(200).json({
        success: true,
        subscriptions: result.rows
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al obtener las suscripciones:', error);
    res.status(500).json({ error: 'Error al obtener las suscripciones' });
  }
};

// Obtener una suscripción por ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Se requiere el ID de la suscripción' });
    }
    
    const client = await req.pgPool.connect();
    try {
      const queryText = 'SELECT * FROM subscriptions WHERE id = $1';
      const result = await client.query(queryText, [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Suscripción no encontrada' });
      }
      
      res.status(200).json({
        success: true,
        subscription: result.rows[0]
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al obtener la suscripción:', error);
    res.status(500).json({ error: 'Error al obtener la suscripción' });
  }
};

// Cancelar una suscripción
exports.cancelSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Se requiere el ID de la suscripción' });
    }
    
    const client = await req.pgPool.connect();
    try {
      const queryText = 'UPDATE subscriptions SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
      const result = await client.query(queryText, ['canceled', id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Suscripción no encontrada' });
      }
      
      res.status(200).json({
        success: true,
        message: 'Suscripción cancelada correctamente',
        subscription: result.rows[0]
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al cancelar la suscripción:', error);
    res.status(500).json({ error: 'Error al cancelar la suscripción' });
  }
};

// Verificar si un usuario tiene una suscripción activa
exports.checkActiveSubscription = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'Se requiere el ID del usuario' });
    }
    
    const client = await req.pgPool.connect();
    try {
      // Buscar suscripciones activas que no hayan expirado
      const queryText = `
        SELECT * FROM subscriptions
        WHERE user_id = $1
        AND status = 'active'
        AND end_date > NOW()
        ORDER BY end_date DESC
        LIMIT 1
      `;
      
      const result = await client.query(queryText, [userId]);
      
      // Buscar suscripciones pendientes con pagos exitosos
      const pendingQueryText = `
        SELECT s.*, p.status as payment_status
        FROM subscriptions s
        JOIN payments p ON p.subscription_id = s.id
        WHERE s.user_id = $1
        AND p.status = 'succeeded'
        AND s.status = 'pending'
        ORDER BY s.created_at DESC
        LIMIT 1
      `;
      
      const pendingResult = await client.query(pendingQueryText, [userId]);
      
      // Si hay una suscripción pendiente con pago exitoso, actualizarla a activa
      if (pendingResult.rows.length > 0) {
        const pendingSub = pendingResult.rows[0];
        
        // Actualizar la suscripción a activa
        await client.query(
          'UPDATE subscriptions SET status = $1, updated_at = NOW() WHERE id = $2',
          ['active', pendingSub.id]
        );
        
        pendingSub.status = 'active';
        
        res.status(200).json({
          success: true,
          hasActiveSubscription: true,
          subscription: pendingSub
        });
      } else {
        res.status(200).json({
          success: true,
          hasActiveSubscription: result.rows.length > 0,
          subscription: result.rows.length > 0 ? result.rows[0] : null
        });
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al verificar la suscripción:', error);
    res.status(500).json({ error: 'Error al verificar la suscripción' });
  }
};
