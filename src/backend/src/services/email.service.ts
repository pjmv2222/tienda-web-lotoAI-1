import Mailjet from 'node-mailjet';
import dotenv from 'dotenv';

dotenv.config();

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_API_SECRET
});

export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  try {
    const frontendUrl = process.env.NODE_ENV === 'production' 
      ? 'https://loto-ia.com'
      : (process.env.FRONTEND_URL || 'http://localhost:4000');

    const verificationLink = `${frontendUrl}/auth/verify-email/${token}`;
    
    console.log('Enviando email de verificación a:', email);
    console.log('Link de verificación:', verificationLink);

    const result = await mailjet.post('send', { version: 'v3.1' }).request({
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
          Subject: "Verifica tu cuenta en LotoIA",
          TextPart: "Por favor verifica tu cuenta de LotoIA",
          HTMLPart: `
            <h3>Bienvenido a LotoIA</h3>
            <p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p>
            <a href="${verificationLink}">
              Verificar cuenta
            </a>
          `
        }
      ]
    });

    console.log('Email enviado exitosamente');
    return true;
  } catch (error) {
    console.error('Error enviando email:', error);
    return false;
  }
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
  try {
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/reset-password/${token}`;
    
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
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
