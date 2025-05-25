// Script para sincronizar los datos entre MongoDB y PostgreSQL
const mongoose = require('mongoose');
const { Pool } = require('pg');
require('dotenv').config();
const Subscription = require('./models/subscription.model');
const Payment = require('./models/payment.model');

// Configuración de las conexiones
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
    return true;
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
    return false;
  }
};

// Configuración de PostgreSQL
const pgPool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
});

// Función para verificar si existen las tablas en PostgreSQL
const checkPostgresTables = async () => {
  try {
    const client = await pgPool.connect();
    const result = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'subscriptions'
      );
    `);
    const subscriptionsTableExists = result.rows[0].exists;
    
    const result2 = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'payments'
      );
    `);
    const paymentsTableExists = result2.rows[0].exists;
    
    client.release();
    return { subscriptionsTableExists, paymentsTableExists };
  } catch (err) {
    console.error('Error al verificar tablas en PostgreSQL:', err);
    return { subscriptionsTableExists: false, paymentsTableExists: false };
  }
};

// Función para crear las tablas necesarias en PostgreSQL
const createPostgresTables = async () => {
  try {
    const client = await pgPool.connect();
    
    // Crear tabla de usuarios (si no existe)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        mongo_id VARCHAR(255) UNIQUE,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        surname VARCHAR(255),
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    // Crear tabla de suscripciones
    await client.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        mongo_id VARCHAR(255) UNIQUE,
        plan_id VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        start_date TIMESTAMP DEFAULT NOW(),
        end_date TIMESTAMP NOT NULL,
        stripe_customer_id VARCHAR(255),
        stripe_subscription_id VARCHAR(255),
        stripe_payment_intent_id VARCHAR(255),
        payment_method VARCHAR(50) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'eur',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    // Crear tabla de pagos
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        subscription_id INTEGER REFERENCES subscriptions(id),
        mongo_id VARCHAR(255) UNIQUE,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'eur',
        status VARCHAR(50) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        stripe_payment_intent_id VARCHAR(255),
        stripe_charge_id VARCHAR(255),
        reference_number VARCHAR(255),
        metadata JSONB,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    client.release();
    console.log('Tablas creadas en PostgreSQL');
    return true;
  } catch (err) {
    console.error('Error al crear tablas en PostgreSQL:', err);
    return false;
  }
};

// Función para migrar los datos de MongoDB a PostgreSQL
const migrateData = async () => {
  try {
    const mongoConnected = await connectMongo();
    if (!mongoConnected) {
      console.error('No se pudo conectar a MongoDB. Abortando migración.');
      return false;
    }
    
    // Verificar si existen las tablas en PostgreSQL
    const { subscriptionsTableExists, paymentsTableExists } = await checkPostgresTables();
    
    if (!subscriptionsTableExists || !paymentsTableExists) {
      const tablesCreated = await createPostgresTables();
      if (!tablesCreated) {
        console.error('No se pudieron crear las tablas en PostgreSQL. Abortando migración.');
        return false;
      }
    }
    
    // Obtener todos los usuarios desde MongoDB
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    const users = await usersCollection.find({}).toArray();
    
    const client = await pgPool.connect();
    
    // Migrar usuarios
    console.log(`Migrando ${users.length} usuarios...`);
    for (const user of users) {
      try {
        // Verificar si el usuario ya existe en PostgreSQL
        const userExistsResult = await client.query(
          'SELECT id FROM users WHERE mongo_id = $1',
          [user._id.toString()]
        );
        
        if (userExistsResult.rows.length === 0) {
          // Insertar el usuario en PostgreSQL
          await client.query(
            'INSERT INTO users (mongo_id, email, name, surname, phone, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
            [
              user._id.toString(),
              user.email,
              user.nombre || '',
              user.apellido || '',
              user.telefono || '',
              user.createdAt || new Date()
            ]
          );
          console.log(`Usuario migrado: ${user.email}`);
        }
      } catch (err) {
        console.error(`Error al migrar usuario ${user.email}:`, err);
      }
    }
    
    // Obtener todas las suscripciones desde MongoDB
    const subscriptions = await Subscription.find({});
    
    // Migrar suscripciones
    console.log(`Migrando ${subscriptions.length} suscripciones...`);
    for (const subscription of subscriptions) {
      try {
        // Obtener el ID del usuario en PostgreSQL
        const userResult = await client.query(
          'SELECT id FROM users WHERE mongo_id = $1',
          [subscription.userId.toString()]
        );
        
        if (userResult.rows.length > 0) {
          const pgUserId = userResult.rows[0].id;
          
          // Verificar si la suscripción ya existe en PostgreSQL
          const subscriptionExistsResult = await client.query(
            'SELECT id FROM subscriptions WHERE mongo_id = $1',
            [subscription._id.toString()]
          );
          
          if (subscriptionExistsResult.rows.length === 0) {
            // Insertar la suscripción en PostgreSQL
            await client.query(
              `INSERT INTO subscriptions 
              (user_id, mongo_id, plan_id, status, start_date, end_date, 
               stripe_customer_id, stripe_subscription_id, stripe_payment_intent_id, 
               payment_method, amount, currency, created_at, updated_at) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
              [
                pgUserId,
                subscription._id.toString(),
                subscription.planId,
                subscription.status,
                subscription.startDate,
                subscription.endDate,
                subscription.stripeCustomerId || null,
                subscription.stripeSubscriptionId || null,
                subscription.stripePaymentIntentId || null,
                subscription.paymentMethod,
                subscription.amount,
                subscription.currency,
                subscription.createdAt || new Date(),
                subscription.updatedAt || new Date()
              ]
            );
            console.log(`Suscripción migrada: ${subscription._id}`);
          } else {
            // Actualizar la suscripción existente
            const pgSubId = subscriptionExistsResult.rows[0].id;
            await client.query(
              `UPDATE subscriptions SET 
              status = $1, 
              end_date = $2, 
              updated_at = $3
              WHERE id = $4`,
              [
                subscription.status,
                subscription.endDate,
                new Date(),
                pgSubId
              ]
            );
            console.log(`Suscripción actualizada: ${subscription._id}`);
          }
        } else {
          console.log(`No se encontró el usuario para la suscripción ${subscription._id}`);
        }
      } catch (err) {
        console.error(`Error al migrar suscripción ${subscription._id}:`, err);
      }
    }
    
    // Obtener todos los pagos desde MongoDB
    const payments = await Payment.find({});
    
    // Migrar pagos
    console.log(`Migrando ${payments.length} pagos...`);
    for (const payment of payments) {
      try {
        // Obtener el ID del usuario en PostgreSQL
        const userResult = await client.query(
          'SELECT id FROM users WHERE mongo_id = $1',
          [payment.userId.toString()]
        );
        
        if (userResult.rows.length > 0) {
          const pgUserId = userResult.rows[0].id;
          
          // Verificar si el pago ya existe en PostgreSQL
          const paymentExistsResult = await client.query(
            'SELECT id FROM payments WHERE mongo_id = $1',
            [payment._id.toString()]
          );
          
          if (paymentExistsResult.rows.length === 0) {
            // Obtener el ID de la suscripción en PostgreSQL
            let pgSubId = null;
            if (payment.subscriptionId) {
              const subResult = await client.query(
                'SELECT id FROM subscriptions WHERE mongo_id = $1',
                [payment.subscriptionId.toString()]
              );
              if (subResult.rows.length > 0) {
                pgSubId = subResult.rows[0].id;
              }
            }
            
            // Insertar el pago en PostgreSQL
            await client.query(
              `INSERT INTO payments 
              (user_id, subscription_id, mongo_id, amount, currency, status, 
               payment_method, stripe_payment_intent_id, stripe_charge_id, 
               reference_number, metadata, created_at, updated_at) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
              [
                pgUserId,
                pgSubId,
                payment._id.toString(),
                payment.amount,
                payment.currency,
                payment.status,
                payment.paymentMethod,
                payment.stripePaymentIntentId || null,
                payment.stripeChargeId || null,
                payment.referenceNumber || null,
                payment.metadata ? JSON.stringify(payment.metadata) : null,
                payment.createdAt || new Date(),
                payment.updatedAt || new Date()
              ]
            );
            console.log(`Pago migrado: ${payment._id}`);
          }
        } else {
          console.log(`No se encontró el usuario para el pago ${payment._id}`);
        }
      } catch (err) {
        console.error(`Error al migrar pago ${payment._id}:`, err);
      }
    }
    
    client.release();
    console.log('Migración completada con éxito');
    return true;
  } catch (err) {
    console.error('Error en la migración:', err);
    return false;
  } finally {
    // Cerrar conexiones
    await mongoose.connection.close();
    await pgPool.end();
  }
};

// Ejecutar la migración
migrateData()
  .then(success => {
    if (success) {
      console.log('Proceso finalizado correctamente');
    } else {
      console.error('El proceso de migración falló');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Error no controlado:', err);
    process.exit(1);
  });
