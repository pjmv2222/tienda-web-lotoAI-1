import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const email = this.forgotPasswordForm.get('email')?.value;

    this.authService.requestPasswordReset(email).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.';
        // Opcionalmente, redirigir después de un tiempo
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 5000);
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error.status === 404) {
          this.errorMessage = 'No se encontró ninguna cuenta con ese correo electrónico.';
        } else {
          this.errorMessage = 'Error al solicitar el restablecimiento de contraseña. Inténtalo de nuevo más tarde.';
        }
        console.error('Error al solicitar restablecimiento de contraseña:', error);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}
