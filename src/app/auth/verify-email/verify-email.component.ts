import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="verify-email-container">
      <div *ngIf="loading" class="loading-message">
        <p>Verificando tu email...</p>
        <div class="spinner"></div>
      </div>

      <div *ngIf="!loading && !success && error" class="error-message">
        <h2>Error de Verificación</h2>
        <p>{{ error }}</p>
        <button (click)="retryVerification()" class="retry-button">
          Intentar de nuevo
        </button>
        <button (click)="goToLogin()" class="login-button">
          Ir al inicio de sesión
        </button>
      </div>
    </div>
  `,
  styles: [`
    .verify-email-container {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      text-align: center;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .loading-message, .error-message {
      padding: 20px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      margin: 20px auto;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-message {
      color: #e74c3c;
    }

    button {
      margin: 10px;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }

    .retry-button {
      background-color: #3498db;
      color: white;
    }

    .login-button {
      background-color: #2ecc71;
      color: white;
    }

    button:hover {
      opacity: 0.9;
    }
  `]
})
export class VerifyEmailComponent implements OnInit {
  loading = true;
  success = false;
  error: string | null = null;
  private token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log('Token recibido en el componente:', this.token);

    if (!this.token) {
      this.loading = false;
      this.error = 'No se proporcionó un token de verificación';
      return;
    }

    this.verifyEmail();
  }

  private verifyEmail() {
    if (!this.token) return;

    this.loading = true;
    this.error = null;

    this.authService.verifyEmail(this.token).subscribe({
      next: (response) => {
        console.log('Respuesta de verificación:', response);

        // Iniciar sesión automáticamente con el token recibido
        if (response && response.token && response.user) {
          // Guardar el usuario y token en el servicio de autenticación
          this.authService.storeAuthenticatedUser(response.user, response.token);
          console.log('Usuario autenticado automáticamente después de verificación');
        } else {
          console.warn('No se recibió token o usuario en la respuesta de verificación');
        }

        // Redirigir a la página de bienvenida
        this.router.navigate(['/bienvenido']);
      },
      error: (error) => {
        console.error('Error en la verificación:', error);
        this.loading = false;
        this.success = false;
        this.error = error.error?.message || 'Error al verificar el email';
      }
    });
  }

  retryVerification() {
    this.verifyEmail();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

