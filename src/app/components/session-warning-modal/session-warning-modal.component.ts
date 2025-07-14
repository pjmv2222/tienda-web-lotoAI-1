import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SessionService, SessionWarningData } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-warning-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="session-modal-overlay" 
      [class.visible]="warningData.isVisible"
      (click)="onOverlayClick($event)"
    >
      <div class="session-modal" (click)="$event.stopPropagation()">
        
        <!-- Modal de advertencia de sesión próxima a expirar -->
        <div *ngIf="!warningData.isSessionExpired" class="warning-content">
          <div class="modal-icon warning-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          
          <h2>Tu sesión está por expirar</h2>
          
          <div class="countdown">
            <div class="countdown-circle">
              <span class="countdown-number">{{ formatTime(warningData.timeLeft) }}</span>
              <span class="countdown-label">restantes</span>
            </div>
          </div>
          
          <p class="warning-message">
            Por tu seguridad, cerramos automáticamente las sesiones inactivas.<br>
            <strong>¿Quieres seguir navegando?</strong> Haz clic en "Continuar" para mantener tu sesión activa.
          </p>
          
          <div class="modal-actions">
            <button 
              class="btn btn-secondary" 
              (click)="onLogout()"
            >
              Cerrar Sesión
            </button>
            <button 
              class="btn btn-primary" 
              (click)="onContinueSession()"
              [disabled]="isExtending"
            >
              {{ isExtending ? 'Renovando...' : 'Continuar Sesión' }}
            </button>
          </div>
        </div>

        <!-- Modal de sesión expirada -->
        <div *ngIf="warningData.isSessionExpired" class="expired-content">
          <div class="modal-icon expired-icon">
            <i class="fas fa-clock"></i>
          </div>
          
          <h2>Sesión expirada</h2>
          
          <p class="expired-message">
            Tu sesión ha finalizado por seguridad.<br>
            <strong>No te preocupes</strong> - solo necesitas iniciar sesión nuevamente para continuar.
          </p>
          
          <div class="modal-actions">
            <button 
              class="btn btn-primary" 
              (click)="onLoginRedirect()"
            >
              Ir a Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .session-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .session-modal-overlay.visible {
      opacity: 1;
      visibility: visible;
    }

    .session-modal {
      background: white;
      border-radius: 16px;
      padding: 32px;
      max-width: 480px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      text-align: center;
      transform: scale(0.9) translateY(20px);
      transition: transform 0.3s ease;
      position: relative;
    }

    .session-modal-overlay.visible .session-modal {
      transform: scale(1) translateY(0);
    }

    .modal-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 32px;
    }

    .warning-icon {
      background: linear-gradient(45deg, #ff9800, #f57c00);
      color: white;
    }

    .expired-icon {
      background: linear-gradient(45deg, #f44336, #d32f2f);
      color: white;
    }

    h2 {
      color: #333;
      margin: 0 0 24px;
      font-size: 24px;
      font-weight: 600;
    }

    .countdown {
      margin: 24px 0;
    }

    .countdown-circle {
      width: 120px;
      height: 120px;
      border: 4px solid #ff9800;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      background: linear-gradient(135deg, #fff3e0, #ffe0b2);
    }

    .countdown-number {
      font-size: 28px;
      font-weight: bold;
      color: #f57c00;
      line-height: 1;
    }

    .countdown-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .warning-message, .expired-message {
      color: #666;
      line-height: 1.6;
      margin: 24px 0;
      font-size: 16px;
    }

    .modal-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 32px;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background: linear-gradient(45deg, #2196f3, #1976d2);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: linear-gradient(45deg, #1976d2, #1565c0);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
    }

    .btn-secondary {
      background: #f5f5f5;
      color: #666;
      border: 1px solid #ddd;
    }

    .btn-secondary:hover {
      background: #eeeeee;
      color: #333;
    }

    .fa-spinner {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Responsive */
    @media (max-width: 600px) {
      .session-modal {
        padding: 24px;
        margin: 16px;
      }

      .modal-actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  `]
})
export class SessionWarningModalComponent implements OnInit, OnDestroy {
  warningData: SessionWarningData = {
    timeLeft: 0,
    isVisible: false,
    isSessionExpired: false
  };

  isExtending = false;
  private subscription?: Subscription;

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.sessionService.sessionWarning$.subscribe(
      data => this.warningData = data
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onContinueSession(): void {
    this.isExtending = true;
    
    // Intentar renovar el token
    this.authService.refreshCurrentToken().subscribe({
      next: () => {
        console.log('✅ [SessionModal] Sesión extendida exitosamente');
        this.sessionService.extendSession();
        this.isExtending = false;
      },
      error: (error: any) => {
        console.error('❌ [SessionModal] Error al extender sesión:', error);
        this.isExtending = false;
        // Si no se puede renovar, cerrar sesión
        this.onLogout();
      }
    });
  }

  onLogout(): void {
    console.log('🚪 [SessionModal] Usuario solicita cerrar sesión');
    this.sessionService.endSession();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onLoginRedirect(): void {
    console.log('🔑 [SessionModal] Redirigiendo a login después de expiración');
    this.sessionService.endSession();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onOverlayClick(event: Event): void {
    // Permitir cerrar solo si la sesión no está expirada
    if (!this.warningData.isSessionExpired) {
      this.sessionService.hideWarningModal();
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
      return `${remainingSeconds}s`;
    }
  }
} 