import mailjet from 'node-mailjet';
import dotenv from 'dotenv';

dotenv.config();

const mj = mailjet.apiConnect(
  process.env['MAILJET_API_KEY'] || '6d0949fe3bebd9e83bdca5d4e1669402',
  process.env['MAILJET_API_SECRET'] || 'fcd11e866b78ed68526543b355823103'
);

export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  try {
    const subject = 'Verifica tu dirección de correo electrónico';
    const frontendUrl = process.env['FRONTEND_URL'] || 'https://www.loto-ia.com';
    const verificationLink = `${frontendUrl}/verify-email/${token}`;
    console.log('Link de verificación:', verificationLink);

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

    return true;
  } catch (error: any) {
    console.error('Error enviando email:', {
      error: error.message,
      statusCode: error.statusCode,
      errorInfo: error.ErrorInfo,
      errorMessage: error.ErrorMessage,
      response: error.response?.data
    });
    
    // Si es un error de Mailjet, mostrar más detalles
    if (error.response?.data) {
      console.error('Mailjet error details:', error.response.data);
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
