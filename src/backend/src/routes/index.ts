import { Express } from 'express';
import authRoutes from './auth.routes';
import paymentRoutes from './payment.routes';
import predictionRoutes from './prediction.routes';
import productRoutes from './product.routes';
import subscriptionRoutes from './subscription.routes';
import lotteryResultsRoutes from './lottery-results.routes';
import statsRoutes from './stats.routes';
// El webhook tiene su propio middleware en server.ts y no se registra aquí

const setupRoutes = (app: Express) => {
  app.get('/api/health', (req, res) => res.json({ status: 'OK' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/subscriptions', subscriptionRoutes);
  app.use('/api/predictions', predictionRoutes);
  app.use('/api/payments', paymentRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/lottery-results', lotteryResultsRoutes);
  app.use('/api/stats', statsRoutes);
};

export default setupRoutes; 