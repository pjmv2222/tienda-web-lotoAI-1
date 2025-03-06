import sgMail from '@sendgrid/mail';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Configura SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, nombre } = req.body;
      
      // Tu lógica de registro existente
      // ...

      // Enviar email de verificación
      const verificationToken = this.generateVerificationToken(email);
      
      const msg = {
        to: email,
        from: 'noreply@lotoia.com', // Asegúrate de que este dominio esté verificado en SendGrid
        subject: 'Verifica tu cuenta en LotoIA',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #007bff;">Bienvenido a LotoIA</h1>
            <p>Hola ${nombre},</p>
            <p>Gracias por registrarte en LotoIA. Para completar tu registro, haz clic en el siguiente botón:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/verificar/${verificationToken}"
                 style="background-color: #007bff; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 4px; display: inline-block;">
                Verificar mi cuenta
              </a>
            </div>
            <p style="color: #666;">Este enlace expirará en 24 horas.</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              Si no has creado una cuenta en LotoIA, puedes ignorar este email.
            </p>
          </div>
        `
      };

      await sgMail.send(msg);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado. Por favor, verifica tu email.'
      });

    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({
        success: false,
        message: 'Error al procesar el registro'
      });
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.body;
      
      // Verificar token
      const decoded = this.verifyToken(token);
      
      // Actualizar estado de verificación en la base de datos
      // ... tu lógica de actualización ...

      res.json({
        success: true,
        message: 'Email verificado correctamente'
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Token inválido o expirado'
      });
    }
  }

  private generateVerificationToken(email: string): string {
    return jwt.sign(
      { email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
  }

  private verifyToken(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}
