import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { ProgressStepsComponent } from '../../shared/progress-steps/progress-steps.component';
import { AuthService } from '../../services/auth.service';
import { UserRegistration } from '../../models/user.model';
import { RouterModule } from '@angular/router';

interface RegisterResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage, BreadcrumbComponent, ProgressStepsComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  successMessage: string = '';
  passwordStrength = '';
  currentStep = 0;
  isCheckingEmail = false;
  showPassword = false;
  showConfirmPassword = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    // Si el usuario ya está autenticado, redirigir al inicio
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern('^[0-9]{9,12}$')]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validador personalizado para confirmar contraseña
  private passwordMatchValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
  }

  // Getters para acceder fácilmente a los campos del formulario
  get f() { 
    return this.registerForm.controls; 
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

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const registrationData: UserRegistration = {
        nombre: this.f['nombre'].value,
        apellido: this.f['apellido'].value,
        email: this.f['email'].value,
        password: this.f['password'].value,
        confirmPassword: this.f['confirmPassword'].value,
        telefono: this.f['telefono'].value
      };

      this.authService.register(registrationData).subscribe({
        next: () => {
          this.successMessage = 'Registro exitoso. Por favor, verifica tu correo electrónico para activar tu cuenta.';
          this.registerForm.reset();
          setTimeout(() => {
            this.router.navigate(['/auth/verify-email-sent'], { 
              queryParams: { email: registrationData.email }
            });
          }, 3000);
        },
        error: error => {
          this.errorMessage = error.error?.message || 'Error al registrar el usuario';
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  checkEmail() {
    const email = this.f['email'].value;
    if (email && this.f['email'].valid) {
      this.isCheckingEmail = true;

      this.authService.checkEmailExists(email)
        .subscribe({
          next: (exists: boolean) => {
            if (exists) {
              this.f['email'].setErrors({ emailExists: true });
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

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  getPasswordError(): string {
    const control = this.f['password'];
    if (control.errors) {
      if (control.errors['required']) {
        return 'La contraseña es requerida';
      }
      if (control.errors['minlength']) {
        return 'La contraseña debe tener al menos 6 caracteres';
      }
      if (control.errors['pattern']) {
        return 'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número';
      }
    }
    return '';
  }
}
