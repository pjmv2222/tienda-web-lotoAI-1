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
        <div class="card-content" [ngClass]="{'loading': isLoading}">
          <h2>Verificación de Email</h2>
          
          <div *ngIf="isLoading" class="loader">
            <div class="spinner"></div>
            <p>Verificando tu email...</p>
          </div>

          <div *ngIf="!isLoading && success" class="success-message">
            <i class="check-icon">✓</i>
            <h3>¡Email Verificado!</h3>
            <p>Tu cuenta ha sido verificada correctamente.</p>
            <button (click)="goToLogin()" class="btn-primary">Ir al Login</button>
          </div>

          <div *ngIf="!isLoading && !success && errorMessage" class="error-message">
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
  isLoading = true;
  success = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.verifyEmail(token);
    } else {
      this.errorMessage = 'Token de verificación no encontrado';
      this.isLoading = false;
    }
  }

  verifyEmail(token: string) {
    this.authService.verifyEmail(token).subscribe({
      next: (response) => {
        this.success = true;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al verificar el email. Por favor, intenta de nuevo.';
        this.isLoading = false;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  retry() {
    this.isLoading = true;
    this.errorMessage = '';
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.verifyEmail(token);
    }
  }
}
