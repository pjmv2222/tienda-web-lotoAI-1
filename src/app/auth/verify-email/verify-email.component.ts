import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="verification-container">
      <div class="card">
        <div class="card-content" [ngClass]="{'loading': loading}">
          <h2>Verificación de Email</h2>
          
          <div *ngIf="loading" class="loader">
            <div class="spinner"></div>
            <p>Verificando tu email...</p>
          </div>

          <div *ngIf="!loading && verified" class="success-message">
            <i class="check-icon">✓</i>
            <h3>¡Email Verificado!</h3>
            <p>Tu cuenta ha sido verificada correctamente.</p>
            <button (click)="goToLogin()" class="btn-primary">Ir al Login</button>
          </div>

          <div *ngIf="!loading && !verified && errorMessage" class="error-message">
            <i class="error-icon">✗</i>
            <h3>Error de Verificación</h3>
            <p>{{ errorMessage }}</p>
            <button (click)="retry()" class="btn-secondary">Intentar de nuevo</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .verification-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 2rem;
    }

    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
      padding: 2rem;
    }

    .card-content {
      text-align: center;
    }

    .loading {
      opacity: 0.7;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 1rem auto;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .success-message, .error-message {
      margin: 2rem 0;
    }

    .check-icon {
      color: #28a745;
      font-size: 3rem;
    }

    .error-icon {
      color: #dc3545;
      font-size: 3rem;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      margin-top: 1rem;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }
  `]
})
export class VerifyEmailComponent implements OnInit {
  loading = true;
  verified = false;
  errorMessage = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
    
    if (!this.token) {
      this.errorMessage = 'Token de verificación no válido';
      this.loading = false;
      return;
    }

    this.verifyEmail();
  }

  private verifyEmail() {
    this.authService.verifyEmail(this.token).subscribe({
      next: () => {
        this.verified = true;
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/auth/login'], {
            queryParams: { verified: true }
          });
        }, 3000);
      },
      error: error => {
        this.loading = false;
        if (error.status === 404) {
          this.errorMessage = 'El enlace de verificación no es válido o ha expirado.';
        } else if (error.status === 409) {
          this.errorMessage = 'Esta cuenta ya ha sido verificada.';
        } else {
          this.errorMessage = 'Ha ocurrido un error al verificar tu cuenta. Por favor, inténtalo de nuevo.';
        }
      }
    });
  }

  resendVerification() {
    // Esta función se implementará cuando tengamos el endpoint correspondiente
    // this.authService.resendVerificationEmail(this.email)
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  retry() {
    this.loading = true;
    this.errorMessage = '';
    this.verifyEmail();
  }
}
