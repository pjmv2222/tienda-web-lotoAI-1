import Mailjet from 'node-mailjet';
import dotenv from 'dotenv';

dotenv.config();

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY || '6d0949fe3bebd9e83bdca5d4ec3e19db',
  apiSecret: process.env.MAILJET_API_SECRET || 'fcd11e866b78ed68526fd750a7bd6138'
});

export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  try {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4000';
    const verificationLink = `${frontendUrl}/verificar/${token}`;
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
            <p>Este enlace expirará en 24 horas.</p>
            <p>Si no creaste esta cuenta, puedes ignorar este correo.</p>
            <p>Saludos,<br>El equipo de LotoIA</p>
          `
        }
      ]
    });

    return true;
  } catch (error) {
    console.error('Error enviando email:', error);
    return false;
  }
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
  try {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4000';
    const resetLink = `${frontendUrl}/reset-password/${token}`;
    
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
