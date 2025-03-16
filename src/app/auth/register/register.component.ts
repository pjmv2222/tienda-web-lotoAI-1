import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { ProgressStepsComponent } from '../../shared/progress-steps/progress-steps.component';
import { AuthService } from '../../services/auth.service';
import { UserRegistration } from '../../models/user.model';

interface RegisterResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage, BreadcrumbComponent, ProgressStepsComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  successMessage: string = '';
  passwordStrength = '';
  currentStep = 0;
  isCheckingEmail = false;
  showPassword = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern('^[0-9]{9,12}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    // Si el usuario ya está autenticado, redirigir al inicio
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  // Validador personalizado para confirmar contraseña
  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password');
    const confirmPassword = g.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ 'passwordMismatch': true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }

  onPasswordChange(event: Event) {
    const password = (event.target as HTMLInputElement).value;
    this.checkPasswordStrength(password);
  }

  checkPasswordStrength(password: string) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = 
      (hasUpperCase ? 1 : 0) +
      (hasLowerCase ? 1 : 0) +
      (hasNumbers ? 1 : 0) +
      (hasSpecialChar ? 1 : 0);

    if (password.length < 8) {
      this.passwordStrength = 'muy-debil';
    } else if (strength === 1) {
      this.passwordStrength = 'debil';
    } else if (strength === 2) {
      this.passwordStrength = 'fuerte';
    } else if (strength >= 3) {
      this.passwordStrength = 'muy-fuerte';
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const registrationData: UserRegistration = {
        nombre: this.registerForm.get('nombre')?.value,
        apellido: this.registerForm.get('apellido')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        confirmPassword: this.registerForm.get('confirmPassword')?.value,
        telefono: this.registerForm.get('telefono')?.value
      };

      this.authService.register(registrationData).subscribe({
        next: () => {
          this.successMessage = 'Registro exitoso. Por favor, verifica tu correo electrónico para activar tu cuenta.';
          this.registerForm.reset();
          setTimeout(() => {
            this.router.navigate(['/auth/login'], {
              queryParams: { registered: true }
            });
          }, 3000);
        },
        error: error => {
          this.errorMessage = error.error?.message || 'Error al registrar el usuario';
          this.loading = false;
        }
      });
    }
  }

  checkEmail() {
    const email = this.registerForm.get('email')?.value;
    if (email && this.registerForm.get('email')?.valid) {
      this.isCheckingEmail = true;

      this.authService.checkEmailExists(email)
        .subscribe({
          next: (exists: boolean) => {
            if (exists) {
              this.registerForm.get('email')?.setErrors({ emailExists: true });
            }
          },
          error: (error: Error) => {
            console.error('Error al verificar email:', error);
            this.errorMessage = 'Error al verificar el email. Por favor, inténtelo de nuevo.';
          },
          complete: () => {
            this.isCheckingEmail = false;
          }
        });
    }
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : true;
  }

  isStepValid(step: number): boolean {
    const isValid = (field: string): boolean => {
      const control = this.registerForm.get(field);
      return control ? control.valid : false;
    };

    switch(step) {
      case 0:
        return isValid('email') && isValid('password');
      case 1:
        return isValid('nombre') && 
               isValid('apellido') && 
               isValid('telefono');
      case 2:
        return isValid('email') && 
               isValid('password');
      case 3:
        return isValid('telefono');
      default:
        return false;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getPasswordErrors(): string {
    const control = this.registerForm.get('password');
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'La contraseña es requerida';
      if (control.errors['minlength']) return 'La contraseña debe tener al menos 6 caracteres';
      if (control.errors['pattern']) {
        return 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial';
      }
    }
    return '';
  }
}
