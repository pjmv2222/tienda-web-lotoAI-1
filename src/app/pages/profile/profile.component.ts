import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h2>Mi Perfil</h2>
        <button class="btn-logout" (click)="logout()">Cerrar Sesión</button>
      </div>
      
      <div *ngIf="userProfile" class="user-info">
        <div *ngIf="!isEditing">
          <p><strong>Nombre:</strong> {{userProfile.nombre}} {{userProfile.apellido}}</p>
          <p><strong>Email:</strong> {{userProfile.email}}</p>
          <p><strong>Teléfono:</strong> {{userProfile.telefono || 'No especificado'}}</p>
          <p><strong>Fecha de registro:</strong> {{userProfile.fechaRegistro | date:'dd/MM/yyyy'}}</p>
        </div>

        <form *ngIf="isEditing" [formGroup]="editForm" (ngSubmit)="onSubmitEdit()" class="edit-form">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input id="nombre" type="text" formControlName="nombre">
          </div>
          
          <div class="form-group">
            <label for="apellido">Apellido:</label>
            <input id="apellido" type="text" formControlName="apellido">
          </div>
          
          <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input id="telefono" type="tel" formControlName="telefono">
          </div>

          <div class="form-actions">
            <button type="submit" [disabled]="!editForm.valid || loading">Guardar</button>
            <button type="button" (click)="cancelEdit()">Cancelar</button>
          </div>
        </form>

        <form *ngIf="isChangingPassword" [formGroup]="passwordForm" (ngSubmit)="onSubmitPassword()" class="password-form">
          <div class="form-group">
            <label for="currentPassword">Contraseña actual:</label>
            <input id="currentPassword" type="password" formControlName="currentPassword">
          </div>
          
          <div class="form-group">
            <label for="newPassword">Nueva contraseña:</label>
            <input id="newPassword" type="password" formControlName="newPassword">
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirmar contraseña:</label>
            <input id="confirmPassword" type="password" formControlName="confirmPassword">
          </div>

          <div class="form-actions">
            <button type="submit" [disabled]="!passwordForm.valid || loading">Cambiar contraseña</button>
            <button type="button" (click)="cancelPasswordChange()">Cancelar</button>
          </div>
        </form>
      </div>

      <div class="profile-actions" *ngIf="!isEditing && !isChangingPassword">
        <button (click)="startEdit()" class="btn-primary">Editar Perfil</button>
        <button (click)="startPasswordChange()" class="btn-primary">Cambiar Contraseña</button>
        <button (click)="confirmDeleteAccount()" class="btn-danger">Eliminar Cuenta</button>
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

    .profile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .profile-header h2 {
      color: #333;
      margin: 0;
    }

    .btn-logout {
      background-color: #dc3545;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .btn-logout:hover {
      background-color: #c82333;
    }

    .user-info {
      margin-bottom: 2rem;
    }

    .user-info p {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .form-group input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
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

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background-color: #0056b3;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background-color: #c82333;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  isEditing = false;
  isChangingPassword = false;
  loading = false;
  editForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  private loadUserProfile() {
    this.authService.getCurrentUser().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.editForm.patchValue({
          nombre: profile.nombre,
          apellido: profile.apellido,
          telefono: profile.telefono
        });
      },
      error: (error: any) => {
        console.error('Error al cargar el perfil:', error);
        this.router.navigate(['/auth/login']);
      }
    });
  }

  startEdit() {
    this.isEditing = true;
    this.isChangingPassword = false;
  }

  cancelEdit() {
    this.isEditing = false;
    if (this.userProfile) {
      this.editForm.patchValue({
        nombre: this.userProfile.nombre,
        apellido: this.userProfile.apellido,
        telefono: this.userProfile.telefono
      });
    }
  }

  onSubmitEdit() {
    if (this.editForm.valid && this.userProfile) {
      this.loading = true;
      this.authService.updateProfile(this.userProfile.id, this.editForm.value).subscribe({
        next: (updatedProfile) => {
          this.userProfile = updatedProfile;
          this.isEditing = false;
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error al actualizar perfil:', error);
          this.loading = false;
        }
      });
    }
  }

  startPasswordChange() {
    this.isChangingPassword = true;
    this.isEditing = false;
  }

  cancelPasswordChange() {
    this.isChangingPassword = false;
    this.passwordForm.reset();
  }

  onSubmitPassword() {
    if (this.passwordForm.valid) {
      this.loading = true;
      const { currentPassword, newPassword } = this.passwordForm.value;
      this.authService.changePassword({ currentPassword, newPassword }).subscribe({
        next: () => {
          this.isChangingPassword = false;
          this.loading = false;
          this.passwordForm.reset();
        },
        error: (error: any) => {
          console.error('Error al cambiar contraseña:', error);
          this.loading = false;
        }
      });
    }
  }

  confirmDeleteAccount() {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.loading = true;
      this.authService.deleteAccount(this.userProfile?.id || '').subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/auth/login']);
        },
        error: (error: any) => {
          console.error('Error al eliminar cuenta:', error);
          this.loading = false;
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  private passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
}
