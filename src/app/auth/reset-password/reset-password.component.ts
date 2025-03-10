import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string = '';
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    if (!this.token) {
      this.errorMessage = 'Token inválido o expirado. Por favor, solicita un nuevo enlace de recuperación.';
    }
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const newPassword = this.resetPasswordForm.get('password')?.value;

    this.authService.resetPassword(this.token, newPassword).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = 'Tu contraseña ha sido actualizada correctamente. Serás redirigido a la página de inicio de sesión.';
        // Redirigir después de un tiempo
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error.status === 404) {
          this.errorMessage = 'Token inválido o expirado. Por favor, solicita un nuevo enlace de recuperación.';
        } else {
          this.errorMessage = 'Error al restablecer la contraseña. Inténtalo de nuevo más tarde.';
        }
        console.error('Error al restablecer contraseña:', error);
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
