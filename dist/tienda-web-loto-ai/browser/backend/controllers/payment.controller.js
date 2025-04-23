"use strict";
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.processPayPalPayment = exports.createPayPalOrder = exports.processTransferPayment = exports.confirmPayment = exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const PayPalService = __importStar(require("../services/paypal.service"));
// Inicializar Stripe con la clave secreta
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-03-31.basil',
});
// Obtener el precio según el plan
const getPlanPrice = (planId) => {
    switch (planId) {
        case 'basic':
            return 122; // 1.22€ en céntimos
        case 'monthly':
            return 1022; // 10.22€ en céntimos
        case 'pro':
            return 12200; // 122€ en céntimos
        default:
            return 122;
    }
};
/**
 * Crear un PaymentIntent de Stripe
 */
const createPaymentIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, planId, userId } = req.body;
        if (!planId) {
            return res.status(400).json({ error: 'Se requiere el ID del plan' });
        }
        // Usar el monto proporcionado o calcular basado en el planId
        const finalAmount = amount || getPlanPrice(planId);
        // Crear el PaymentIntent
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: finalAmount,
            currency: 'eur',
            metadata: {
                planId,
                userId: userId || 'guest'
            }
        });
        // Guardar el registro de pago en la base de datos (si tienes un modelo)
        // const payment = new Payment({...});
        // await payment.save();
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            id: paymentIntent.id
        });
    }
    catch (error) {
        console.error('Error al crear PaymentIntent:', error);
        res.status(500).json({ error: 'Error al procesar el pago' });
    }
});
exports.createPaymentIntent = createPaymentIntent;
/**
 * Confirmar un pago
 */
const confirmPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentIntentId, userId, planId } = req.body;
        if (!paymentIntentId) {
            return res.status(400).json({ error: 'Se requiere el ID del PaymentIntent' });
        }
        // Recuperar el PaymentIntent
        const paymentIntent = yield stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({
                success: false,
                error: 'El pago no ha sido completado correctamente'
            });
        }
        // Actualizar el registro de pago en la base de datos (si tienes un modelo)
        // const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntentId });
        // if (payment) {
        //   payment.status = 'succeeded';
        //   await payment.save();
        // }
        // Crear una suscripción (si corresponde)
        // const subscription = new Subscription({...});
        // await subscription.save();
        res.status(200).json({
            success: true,
            paymentIntent: {
                id: paymentIntent.id,
                status: paymentIntent.status
            }
        });
    }
    catch (error) {
        console.error('Error al confirmar el pago:', error);
        res.status(500).json({ error: 'Error al confirmar el pago' });
    }
});
exports.confirmPayment = confirmPayment;
/**
 * Procesar un pago por transferencia
 */
const processTransferPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, planId, referenceNumber } = req.body;
        if (!planId) {
            return res.status(400).json({ error: 'Se requiere el ID del plan' });
        }
        // Obtener el precio del plan
        const amount = getPlanPrice(planId) / 100; // Convertir de céntimos a euros
        // Crear el registro de pago en la base de datos (si tienes un modelo)
        // const payment = new Payment({...});
        // await payment.save();
        // Crear la suscripción (en estado pendiente)
        // const subscription = new Subscription({...});
        // await subscription.save();
        res.status(200).json({
            success: true,
            payment: {
                referenceNumber,
                status: 'pending'
            }
        });
    }
    catch (error) {
        console.error('Error al procesar el pago por transferencia:', error);
        res.status(500).json({ error: 'Error al procesar el pago por transferencia' });
    }
});
exports.processTransferPayment = processTransferPayment;
/**
 * Crear una orden de pago con PayPal
 */
const createPayPalOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { planId } = req.body;
        if (!planId) {
            return res.status(400).json({ error: 'Se requiere el ID del plan' });
        }
        // Obtener el precio del plan
        const amount = getPlanPrice(planId) / 100; // Convertir de céntimos a euros
        // Crear la descripción del plan
        let planName = 'Plan Básico';
        if (planId === 'monthly')
            planName = 'Plan Mensual';
        if (planId === 'pro')
            planName = 'Plan Pro';
        // Crear la orden en PayPal
        const order = yield PayPalService.createOrder(amount, 'EUR', `LotoIA - ${planName}`);
        res.status(200).json({
            success: true,
            orderId: order.id,
            approvalUrl: order.links.find((link) => link.rel === 'approve').href
        });
    }
    catch (error) {
        console.error('Error al crear la orden de PayPal:', error);
        res.status(500).json({ error: 'Error al crear la orden de PayPal' });
    }
});
exports.createPayPalOrder = createPayPalOrder;
/**
 * Procesar un pago con PayPal
 */
const processPayPalPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, planId, paypalOrderId } = req.body;
        if (!planId || !paypalOrderId) {
            return res.status(400).json({ error: 'Se requieren el ID del plan y el ID de la orden de PayPal' });
        }
        // Verificar el estado de la orden
        const orderDetails = yield PayPalService.getOrderDetails(paypalOrderId);
        if (orderDetails.status !== 'COMPLETED') {
            // Capturar la orden si aún no está completada
            const captureResult = yield PayPalService.captureOrder(paypalOrderId);
            if (captureResult.status !== 'COMPLETED') {
                return res.status(400).json({
                    success: false,
                    error: 'No se pudo completar el pago con PayPal'
                });
            }
        }
        // Obtener el precio del plan
        const amount = getPlanPrice(planId) / 100; // Convertir de céntimos a euros
        // Crear el registro de pago en la base de datos (si tienes un modelo)
        // const payment = new Payment({...});
        // await payment.save();
        // Crear la suscripción
        // const subscription = new Subscription({...});
        // await subscription.save();
        res.status(200).json({
            success: true,
            payment: {
                status: 'succeeded',
                orderId: paypalOrderId
            }
        });
    }
    catch (error) {
        console.error('Error al procesar el pago con PayPal:', error);
        res.status(500).json({ error: 'Error al procesar el pago con PayPal' });
    }
});
exports.processPayPalPayment = processPayPalPayment;
