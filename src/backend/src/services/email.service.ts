import mailjet from 'node-mailjet';
import dotenv from 'dotenv';

dotenv.config();

const mj = mailjet.apiConnect(
  process.env['MAILJET_API_KEY'] || '4bf635e9052dd9ad0b18200a0ae43fb0',
  process.env['MAILJET_API_SECRET'] || '750dabff4daca14b5a4128e1669b75f6'
);

console.log('[Email Service] Configuración de Mailjet:', {
  apiKey: process.env['MAILJET_API_KEY'] ? 'Definida por variable de entorno' : 'Usando valor por defecto',
  apiSecret: process.env['MAILJET_API_SECRET'] ? 'Definida por variable de entorno' : 'Usando valor por defecto'
});

export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  try {
    console.log('[Email Service] Iniciando envío de email de verificación');
    const subject = 'Verifica tu dirección de correo electrónico';
    const frontendUrl = process.env['FRONTEND_URL'] || 'https://www.loto-ia.com';
    const verificationLink = `${frontendUrl}/verify-email/${token}`;
    console.log('[Email Service] Link de verificación:', verificationLink);
    console.log('[Email Service] Configuración:', {
      frontendUrl,
      to: email,
      from: "adm@loto-ia.com"
    });

    const result = await mj.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "adm@loto-ia.com",
            Name: "LotoIA"
          },
          To: [
            {
              Email: email,
              Name: email
            }
          ],
          Subject: subject,
          TextPart: "Por favor verifica tu cuenta de LotoIA",
          HTMLPart: `
            <h3>Bienvenido a LotoIA</h3>
            <p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p>
            <a href="${verificationLink}">
              Verificar cuenta
            </a>
            <p>Este enlace expirará en 24 horas.</p>
            <p>Si no creaste esta cuenta, puedes ignorar este correo.</p>
            <p>Saludos,<br>El equipo de LotoIA</p>
          `
        }
      ]
    });

    console.log('[Email Service] Email enviado exitosamente');
    return true;
  } catch (error: any) {
    console.error('[Email Service] Error enviando email:', {
      message: error.message,
      statusCode: error.statusCode,
      errorInfo: error.ErrorInfo,
      errorMessage: error.ErrorMessage,
      response: error.response?.data,
      stack: error.stack
    });
    
    // Si es un error de Mailjet, mostrar más detalles
    if (error.response?.data) {
      console.error('[Email Service] Mailjet error details:', JSON.stringify(error.response.data, null, 2));
    }
    
    return false;
  }
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
  try {
    const frontendUrl = process.env['FRONTEND_URL'] || 'https://www.loto-ia.com';
    const resetLink = `${frontendUrl}/reset-password/${token}`;
    
    const result = await mj.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "adm@loto-ia.com",
            Name: "LotoIA"
          },
          To: [
            {
              Email: email,
              Name: email
            }
          ],
          Subject: "Recuperación de contraseña en LotoIA",
          TextPart: "Recupera tu contraseña en LotoIA",
          HTMLPart: `
            <h3>Recuperación de contraseña en LotoIA</h3>
            <p>Has solicitado restablecer tu contraseña en LotoIA.</p>
            <p>Para completar el proceso, haz clic en el siguiente enlace:</p>
            <a href="${resetLink}">
              Restablecer contraseña
            </a>
            <p>Este enlace expirará en 1 hora.</p>
            <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
            <p>Saludos,<br>El equipo de LotoIA</p>
          `
        }
      ]
    });

    console.log('Email de recuperación enviado a:', email);
    return true;
  } catch (error) {
    console.error('Error enviando email de recuperación:', error);
    return false;
  }
}
