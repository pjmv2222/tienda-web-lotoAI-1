import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  editMode = false;
  successMessage = '';
  errorMessage = '';
  userProfile: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.pattern('^[0-9]{9,12}$')]],
      email: [{ value: '', disabled: true }]
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userProfile = this.authService.currentUserValue;
    if (this.userProfile) {
      this.profileForm.patchValue({
        nombre: this.userProfile.nombre,
        apellido: this.userProfile.apellido,
        telefono: this.userProfile.telefono || '',
        email: this.userProfile.email
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.successMessage = '';
    this.errorMessage = '';
    
    if (!this.editMode) {
      this.resetForm();
    }
  }

  resetForm() {
    if (this.userProfile) {
      this.profileForm.patchValue({
        nombre: this.userProfile.nombre,
        apellido: this.userProfile.apellido,
        telefono: this.userProfile.telefono || '',
        email: this.userProfile.email
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid && this.userProfile) {
      this.loading = true;
      const updatedProfile = this.profileForm.getRawValue();
      
      this.authService.update(updatedProfile).subscribe({
        next: (response: User) => {
          this.loading = false;
          this.successMessage = 'Perfil actualizado correctamente';
          this.editMode = false;
          this.userProfile = response;
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.errorMessage = 'Error al actualizar el perfil. Por favor, intenta de nuevo.';
        }
      });
    }
  }

  deleteAccount() {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.loading = true;
      this.authService.delete().subscribe({
        next: () => {
          this.router.navigate(['/auth/login'], {
            queryParams: { deleted: true }
          });
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.errorMessage = 'Error al eliminar la cuenta. Por favor, intenta de nuevo.';
        }
      });
    }
  }
} 