import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserRegistration } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;
  passwordStrength = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Inicializando componente de registro');
    // Si el usuario ya está autenticado, redirigir al inicio
    if (this.authService.currentUserValue) {
      console.log('Usuario ya autenticado, redirigiendo...');
      this.router.navigate(['/']);
      return;
    }

    // Inicializar el formulario
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern('^[0-9]{9,12}$')]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        this.createPasswordStrengthValidator()
      ]],
      confirmPassword: ['', [Validators.required]]
    });

    // Añadir validador de coincidencia de contraseñas
    this.registerForm.setValidators(this.passwordMatchValidator);
    this.registerForm.updateValueAndValidity();

    // Suscribirse a cambios en el formulario para debugging
    this.registerForm.statusChanges.subscribe(status => {
      console.log('Estado del formulario:', status);
      if (status === 'INVALID') {
        console.log('Errores del formulario:', this.registerForm.errors);
      }
    });

    // Suscribirse a cambios en el campo de contraseña
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordStrength = this.calculatePasswordStrength(value || '');
    });
  }

  // Validador personalizado para la fortaleza de la contraseña
  private createPasswordStrengthValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasMinLength = value.length >= 6;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasMinLength;

      if (!passwordValid) {
        return {
          passwordStrength: {
            hasUpperCase,
            hasLowerCase,
            hasNumeric,
            hasMinLength
          }
        };
      }

      return null;
    };
  }

  // Método para obtener mensajes de error de la contraseña
  getPasswordErrorMessage(): string {
    const control = this.registerForm.get('password');
    if (control?.errors) {
      if (control.errors['required']) {
        return 'La contraseña es requerida';
      }
      if (control.errors['passwordStrength']) {
        const errors = control.errors['passwordStrength'];
        const messages = [];
        if (!errors.hasMinLength) messages.push('al menos 6 caracteres');
        if (!errors.hasUpperCase) messages.push('una letra mayúscula');
        if (!errors.hasLowerCase) messages.push('una letra minúscula');
        if (!errors.hasNumeric) messages.push('un número');
        return `La contraseña debe contener ${messages.join(', ')}`;
      }
    }
    return '';
  }

  // Método para alternar la visibilidad de las contraseñas
  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Validador personalizado para confirmar contraseña
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    if (!control || !(control instanceof FormGroup)) return null;
    
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) return null;

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }

  // Getter para acceder fácilmente a los campos del formulario
  get f() { 
    return this.registerForm?.controls || {}; 
  }

  onSubmit(): void {
    console.log('Iniciando proceso de registro...');
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log('Formulario inválido:', this.registerForm.errors);
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.errors) {
          console.log(`Errores en ${key}:`, control.errors);
        }
      });
      return;
    }

    console.log('Formulario válido, preparando datos para registro...');
    this.loading = true;
    const registrationData: UserRegistration = {
      nombre: this.f['nombre'].value,
      apellido: this.f['apellido'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
      telefono: this.f['telefono'].value
    };

    console.log('Enviando datos de registro:', { ...registrationData, password: '[PROTECTED]' });
    this.authService.register(registrationData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        // Redirigir al usuario a la página de login con mensaje de verificación pendiente
        this.router.navigate(['/auth/login'], { 
          queryParams: { 
            registered: true,
            email: registrationData.email 
          }
        });
      },
      error: error => {
        console.error('Error en el registro:', error);
        this.errorMessage = error.error?.message || 'Error al registrar usuario';
        this.loading = false;
      }
    });
  }

  // Método para calcular la fortaleza de la contraseña
  calculatePasswordStrength(password: string): number {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  }
}
