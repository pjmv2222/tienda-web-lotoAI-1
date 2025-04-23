"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderDetails = exports.captureOrder = exports.createOrder = exports.getAccessToken = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configuración de PayPal
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';
// URLs de la API de PayPal
const BASE_URL = PAYPAL_MODE === 'live'
    ? 'https://api.paypal.com'
    : 'https://api.sandbox.paypal.com';
/**
 * Obtiene un token de acceso para la API de PayPal
 */
const getAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield (0, axios_1.default)({
            method: 'post',
            url: `${BASE_URL}/v1/oauth2/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${auth}`
            },
            data: 'grant_type=client_credentials'
        });
        console.log('Token de PayPal obtenido correctamente');
        return response.data.access_token;
    }
    catch (error) {
        console.error('Error al obtener el token de acceso de PayPal:', error);
        throw new Error('No se pudo obtener el token de acceso de PayPal');
    }
});
exports.getAccessToken = getAccessToken;
/**
 * Crea una orden de pago en PayPal
 */
const createOrder = (amount_1, ...args_1) => __awaiter(void 0, [amount_1, ...args_1], void 0, function* (amount, currency = 'EUR', description) {
    try {
        const accessToken = yield (0, exports.getAccessToken)();
        const response = yield (0, axios_1.default)({
            method: 'post',
            url: `${BASE_URL}/v2/checkout/orders`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
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
                    return_url: `${process.env.FRONTEND_URL}/confirmacion-pago`,
                    cancel_url: `${process.env.FRONTEND_URL}/cancelar-pago`
                }
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error al crear la orden de PayPal:', error);
        throw new Error('No se pudo crear la orden de PayPal');
    }
});
exports.createOrder = createOrder;
/**
 * Captura una orden de pago en PayPal
 */
const captureOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield (0, exports.getAccessToken)();
        const response = yield (0, axios_1.default)({
            method: 'post',
            url: `${BASE_URL}/v2/checkout/orders/${orderId}/capture`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error al capturar la orden de PayPal:', error);
        throw new Error('No se pudo capturar la orden de PayPal');
    }
});
exports.captureOrder = captureOrder;
/**
 * Verifica el estado de una orden de pago en PayPal
 */
const getOrderDetails = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield (0, exports.getAccessToken)();
        const response = yield (0, axios_1.default)({
            method: 'get',
            url: `${BASE_URL}/v2/checkout/orders/${orderId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener los detalles de la orden de PayPal:', error);
        throw new Error('No se pudo obtener los detalles de la orden de PayPal');
    }
});
exports.getOrderDetails = getOrderDetails;
