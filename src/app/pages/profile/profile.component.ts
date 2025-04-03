import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h2>Mi Perfil</h2>
      
      <div *ngIf="userProfile" class="user-info">
        <p><strong>Nombre:</strong> {{userProfile.nombre}} {{userProfile.apellido}}</p>
        <p><strong>Email:</strong> {{userProfile.email}}</p>
        <p><strong>Teléfono:</strong> {{userProfile.telefono || 'No especificado'}}</p>
        <p><strong>Fecha de registro:</strong> {{userProfile.fechaRegistro | date:'dd/MM/yyyy'}}</p>
      </div>

      <div class="profile-actions">
        <button (click)="editProfile()">Editar Perfil</button>
        <button (click)="changePassword()">Cambiar Contraseña</button>
        <button (click)="logout()" class="logout-btn">Cerrar Sesión</button>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h2 {
      color: #333;
      margin-bottom: 2rem;
    }

    .user-info {
      margin-bottom: 2rem;
    }

    .user-info p {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }

    .profile-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s;
    }

    button:not(.logout-btn) {
      background-color: #007bff;
      color: white;
    }

    button:not(.logout-btn):hover {
      background-color: #0056b3;
    }

    .logout-btn {
      background-color: #dc3545;
      color: white;
    }

    .logout-btn:hover {
      background-color: #c82333;
    }
  `]
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  userProfile: UserProfile | null = null;

  ngOnInit() {
    this.loadUserProfile();
  }

  private loadUserProfile() {
    this.authService.getCurrentUser().subscribe({
      next: (profile) => {
        this.userProfile = profile;
      },
      error: (error) => {
        console.error('Error al cargar el perfil:', error);
        this.router.navigate(['/login']);
      }
    });
  }

  editProfile() {
    // Por implementar
    console.log('Editar perfil');
  }

  changePassword() {
    // Por implementar
    console.log('Cambiar contraseña');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
} 