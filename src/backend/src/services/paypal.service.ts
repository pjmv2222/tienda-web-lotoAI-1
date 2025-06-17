import axios from 'axios';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

// Configuración de PayPal
const PAYPAL_CLIENT_ID = process.env['PAYPAL_CLIENT_ID'];
const PAYPAL_CLIENT_SECRET = process.env['PAYPAL_CLIENT_SECRET'];
const PAYPAL_MODE = process.env['PAYPAL_MODE'] || 'sandbox';
const base = PAYPAL_MODE === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

/**
 * Obtiene un token de acceso para la API de PayPal
 */
export const getAccessToken = async (): Promise<string> => {
  try {
    // Verificar que las credenciales estén definidas
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error('Las credenciales de PayPal no están configuradas');
    }

    // Codificar correctamente las credenciales
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');

    console.log('Intentando obtener token de PayPal con las siguientes credenciales:');
    console.log(`Client ID: ${PAYPAL_CLIENT_ID.substring(0, 10)}...`);
    console.log(`Client Secret: ${PAYPAL_CLIENT_SECRET.substring(0, 5)}...`);

    const response = await axios({
      method: 'post',
      url: `${base}/v1/oauth2/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}`
      },
      data: 'grant_type=client_credentials'
    });

    console.log('Token de PayPal obtenido correctamente');
    return response.data.access_token;
  } catch (error) {
    console.error('Error al obtener el token de acceso de PayPal:', error);
    throw new Error('No se pudo obtener el token de acceso de PayPal');
  }
};

/**
 * Crea una orden de pago en PayPal
 */
export const createOrder = async (amount: number, currency: string = 'EUR', description: string): Promise<any> => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${base}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toFixed(2)
            },
            description
          }
        ],
        application_context: {
          brand_name: 'LotoIA',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
          return_url: `${process.env['FRONTEND_URL']}/confirmacion-pago`,
          cancel_url: `${process.env['FRONTEND_URL']}/cancelar-pago`
        }
      })
    });

    return await response.json();
  } catch (error) {
    console.error('Error al crear la orden de PayPal:', error);
    throw new Error('No se pudo crear la orden de PayPal');
  }
};

/**
 * Captura una orden de pago en PayPal
 */
export const captureOrder = async (orderId: string): Promise<any> => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios({
      method: 'post',
      url: `${base}/v2/checkout/orders/${orderId}/capture`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al capturar la orden de PayPal:', error);
    throw new Error('No se pudo capturar la orden de PayPal');
  }
};

/**
 * Verifica el estado de una orden de pago en PayPal
 */
export const getOrderDetails = async (orderId: string): Promise<any> => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios({
      method: 'get',
      url: `${base}/v2/checkout/orders/${orderId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener los detalles de la orden de PayPal:', error);
    throw new Error('No se pudo obtener los detalles de la orden de PayPal');
  }
};
