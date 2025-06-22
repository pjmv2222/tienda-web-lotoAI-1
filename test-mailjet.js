const mailjet = require('node-mailjet');
require('dotenv').config();

console.log('=== DIAGNÓSTICO DE MAILJET ===');
console.log('Variables de entorno:');
console.log('MAILJET_API_KEY:', process.env.MAILJET_API_KEY ? 'Definida' : 'No definida');
console.log('MAILJET_API_SECRET:', process.env.MAILJET_API_SECRET ? 'Definida' : 'No definida');

const apiKey = process.env.MAILJET_API_KEY || '6d0949fe3bebd9e83bdca5d4e1669402';
const apiSecret = process.env.MAILJET_API_SECRET || 'fcd11e866b78ed68526543b355823103';

console.log('\nClaves que se van a usar:');
console.log('API Key:', apiKey);
console.log('API Secret:', apiSecret);

const mj = mailjet.apiConnect(apiKey, apiSecret);

async function testMailjet() {
  try {
    console.log('\n=== PROBANDO CONEXIÓN CON MAILJET ===');
    
    // Probar con una petición simple para verificar las credenciales
    const result = await mj.get('sender').request();
    console.log('✅ Conexión exitosa con Mailjet');
    console.log('Senders disponibles:', result.body.Data.length);
    
    // Intentar enviar un email de prueba
    console.log('\n=== PROBANDO ENVÍO DE EMAIL ===');
    const emailResult = await mj.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "adm@loto-ia.com",
            Name: "LotoIA Test"
          },
          To: [
            {
              Email: "pjulianmv@gmail.com",
              Name: "Test User"
            }
          ],
          Subject: "Test de diagnóstico Mailjet",
          TextPart: "Este es un email de prueba para verificar la configuración de Mailjet",
          HTMLPart: "<h3>Test de diagnóstico</h3><p>Este es un email de prueba para verificar la configuración de Mailjet</p>"
        }
      ]
    });
    
    console.log('✅ Email enviado exitosamente');
    console.log('Message ID:', emailResult.body.Messages[0].To[0].MessageID);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode);
    }
    if (error.ErrorMessage) {
      console.error('Error Message:', error.ErrorMessage);
    }
    if (error.response && error.response.data) {
      console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testMailjet();
