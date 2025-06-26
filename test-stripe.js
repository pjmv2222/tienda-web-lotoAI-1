const stripe = require('stripe')('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');

async function testStripeConnection() {
  try {
    console.log('Probando conexión con Stripe...');
    
    // Intentar crear un PaymentIntent de prueba
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // 10.00 EUR
      currency: 'eur',
      payment_method_types: ['card'],
      metadata: {
        test: 'true'
      }
    });

    console.log('✅ Conexión exitosa con Stripe');
    console.log('PaymentIntent ID:', paymentIntent.id);
    console.log('Client Secret:', paymentIntent.client_secret);

    // Inmediatamente cancelar el PaymentIntent ya que es solo una prueba
    await stripe.paymentIntents.cancel(paymentIntent.id);
    console.log('PaymentIntent cancelado exitosamente');

  } catch (error) {
    console.error('❌ Error al conectar con Stripe:', error.message);
  }
}

testStripeConnection();
