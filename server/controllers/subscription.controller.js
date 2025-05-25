const Subscription = require('../models/subscription.model');

// Obtener todas las suscripciones de un usuario
exports.getUserSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'Se requiere el ID del usuario' });
    }
    
    const subscriptions = await Subscription.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      subscriptions
    });
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
    
    const subscription = await Subscription.findById(id);
    
    if (!subscription) {
      return res.status(404).json({ error: 'Suscripción no encontrada' });
    }
    
    res.status(200).json({
      success: true,
      subscription
    });
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
    
    const subscription = await Subscription.findById(id);
    
    if (!subscription) {
      return res.status(404).json({ error: 'Suscripción no encontrada' });
    }
    
    // Actualizar el estado de la suscripción
    subscription.status = 'canceled';
    await subscription.save();
    
    res.status(200).json({
      success: true,
      message: 'Suscripción cancelada correctamente',
      subscription
    });
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
    
    const now = new Date();
    
    // Buscar suscripciones activas que no hayan expirado
    const activeSubscription = await Subscription.findOne({
      userId,
      status: 'active',
      endDate: { $gt: now }
    }).sort({ endDate: -1 });
    
    res.status(200).json({
      success: true,
      hasActiveSubscription: !!activeSubscription,
      subscription: activeSubscription
    });
  } catch (error) {
    console.error('Error al verificar la suscripción:', error);
    res.status(500).json({ error: 'Error al verificar la suscripción' });
  }
};
