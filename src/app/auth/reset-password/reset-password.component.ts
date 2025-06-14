import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  submitted = false;
  token: string = '';
  error = '';
  success = '';
  // Añadir las propiedades faltantes
  successMessage = '';
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    // Get token from route parameters
    this.token = this.route.snapshot.params['token'];
    
    if (!this.token) {
      this.error = 'Token inválido o expirado';
      this.router.navigate(['/auth/login']);
    }
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      const confirmPasswordControl = formGroup.get('confirmPassword');
      if (confirmPasswordControl?.errors) {
        const errors = { ...confirmPasswordControl.errors };
        delete errors['passwordMismatch'];
        confirmPasswordControl.setErrors(Object.keys(errors).length ? errors : null);
      }
    }
    return null;
  }

  // Getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  // Añadir los métodos faltantes
  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  getPasswordErrors(): string {
    const control = this.resetForm.get('password');
    if (control?.errors) {
      if (control.errors['required']) {
        return 'La contraseña es requerida';
      }
      if (control.errors['minlength']) {
        return 'La contraseña debe tener al menos 6 caracteres';
      }
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;
    const resetData = {
      token: this.token,
      password: this.f['password'].value,
      confirmPassword: this.f['confirmPassword'].value
    };

    this.authService.resetPassword(resetData)
      .subscribe({
        next: () => {
          this.successMessage = 'Tu contraseña ha sido actualizada correctamente';
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3000);
        },
        error: error => {
          this.errorMessage = error?.error?.message || 'Error al restablecer la contraseña';
          this.loading = false;
        }
      });
  }
}

