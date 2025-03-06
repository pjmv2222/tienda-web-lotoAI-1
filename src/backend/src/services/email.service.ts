import Mailjet from 'node-mailjet';
import dotenv from 'dotenv';

dotenv.config();

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY || '6d0949fe3bebd9e83bdca5d4ec3e19db',
  apiSecret: process.env.MAILJET_API_SECRET || 'fcd11e866b78ed68526fd750a7bd6138'
});

export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  try {
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
            <a href="${process.env.FRONTEND_URL}/verify-email?token=${token}">
              Verificar cuenta
            </a>
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
