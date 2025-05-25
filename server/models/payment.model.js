const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'eur'
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'succeeded', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'paypal', 'transfer'],
    required: true
  },
  stripePaymentIntentId: {
    type: String
  },
  stripeChargeId: {
    type: String
  },
  referenceNumber: {
    type: String
  },
  metadata: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
