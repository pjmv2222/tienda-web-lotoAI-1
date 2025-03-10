import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { ProgressStepsComponent } from '../../shared/progress-steps/progress-steps.component';
import { AuthService } from '../../services/auth.service';

interface RegisterResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage, BreadcrumbComponent, ProgressStepsComponent],
  template: `
    <app-breadcrumb></app-breadcrumb>
    <app-progress-steps [currentStep]="currentStep"></app-progress-steps>

    <!-- Mensaje de error mejorado -->
    <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
      <div [innerHTML]="errorMessage"></div>
      <button type="button" class="close-btn" (click)="errorMessage = ''">×</button>
    </div>

    <div class="register-container">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" id="registerForm" name="registerForm">
        <!-- 1. DATOS DE ACCESO -->
        <div class="form-section" [class.hidden]="currentStep !== 0">
          <h2>1. DATOS DE ACCESO</h2>
          
          <div class="form-group">
            <input type="text" 
                   id="email"
                   name="email"
                   formControlName="email" 
                   placeholder="Correo electrónico o NIF/NIE"
                   class="form-input"
                   [class.is-invalid]="isFieldInvalid('email')"
                   (blur)="checkEmail()">
            <div class="spinner" *ngIf="isCheckingEmail">
              <div class="loader"></div>
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              <span *ngIf="registerForm.get('email')?.errors?.['required']">El email es requerido</span>
              <span *ngIf="registerForm.get('email')?.errors?.['email']">El email no es válido</span>
              <span *ngIf="registerForm.get('email')?.errors?.['emailExists']">Este email ya está registrado</span>
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Contraseña</label>
            <div class="password-input-container">
              <input [type]="showPassword ? 'text' : 'password'"
                   id="password"
                   name="password"
                   formControlName="password" 
                   placeholder="Contraseña"
                   class="form-input"
                   (input)="onPasswordChange($event)"
                   [class.is-invalid]="isFieldInvalid('password')">
              <button type="button" class="toggle-password-btn" (click)="togglePasswordVisibility()">
                <i class="fas" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
              </button>
            </div>
            <div class="password-strength" *ngIf="passwordStrength">
              <span [class]="passwordStrength">{{passwordStrength}}</span>
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('password')">
              <span *ngIf="registerForm.get('password')?.errors?.['required']">La contraseña es requerida</span>
              <span *ngIf="registerForm.get('password')?.errors?.['minlength']">La contraseña debe tener al menos 8 caracteres</span>
            </div>
          </div>

          <div class="button-container">
            <button type="button" class="next-btn" (click)="nextStep()" [disabled]="!isStepValid(0)">
              Siguiente
            </button>
          </div>
        </div>

        <!-- 2. DATOS PERSONALES -->
        <div class="form-section" [class.hidden]="currentStep !== 1">
          <h2>2. DATOS PERSONALES</h2>
          
          <div class="form-group">
            <input type="text"
                   id="nombre"
                   name="nombre"
                   formControlName="nombre"
                   placeholder="Nombre"
                   autocomplete="given-name"
                   class="form-input"
                   [class.is-invalid]="isFieldInvalid('nombre')">
            <div class="error-message" *ngIf="isFieldInvalid('nombre')">
              <span *ngIf="registerForm.get('nombre')?.errors?.['required']">El nombre es requerido</span>
            </div>
          </div>

          <div class="form-group">
            <input type="text"
                   id="apellidos"
                   name="apellidos"
                   formControlName="apellidos"
                   placeholder="Apellidos"
                   autocomplete="family-name"
                   class="form-input"
                   [class.is-invalid]="isFieldInvalid('apellidos')">
            <div class="error-message" *ngIf="isFieldInvalid('apellidos')">
              <span *ngIf="registerForm.get('apellidos')?.errors?.['required']">Los apellidos son requeridos</span>
            </div>
          </div>

          <div class="form-group">
            <input type="text"
                   id="nif"
                   name="nif"
                   formControlName="nif"
                   placeholder="NIF/NIE"
                   class="form-input"
                   [class.is-invalid]="isFieldInvalid('nif')">
            <div class="error-message" *ngIf="isFieldInvalid('nif')">
              <span *ngIf="registerForm.get('nif')?.errors?.['required']">El NIF/NIE es requerido</span>
            </div>
          </div>

          <div class="form-group">
            <input type="date"
                   id="fechaNacimiento"
                   name="fechaNacimiento"
                   formControlName="fechaNacimiento"
                   class="form-input"
                   [class.is-invalid]="isFieldInvalid('fechaNacimiento')">
            <label for="fechaNacimiento">Fecha de nacimiento</label>
            <div class="error-message" *ngIf="isFieldInvalid('fechaNacimiento')">
              <span *ngIf="registerForm.get('fechaNacimiento')?.errors?.['required']">La fecha de nacimiento es requerida</span>
            </div>
          </div>
        </div>

        <!-- 3. DIRECCIÓN -->
        <div class="form-section" [class.hidden]="currentStep !== 2">
          <h2>3. DIRECCIÓN</h2>
          
          <div class="form-group">
            <input type="text"
                   id="direccion"
                   name="direccion"
                   formControlName="direccion"
                   placeholder="Dirección"
                   autocomplete="street-address"
                   class="form-input"
                   [class.is-invalid]="isFieldInvalid('direccion')">
            <div class="error-message" *ngIf="isFieldInvalid('direccion')">
              <span *ngIf="registerForm.get('direccion')?.errors?.['required']">La dirección es requerida</span>
            </div>
          </div>

          <div class="form-group">
            <input type="text"
                   id="codigoPostal"
                   name="codigoPostal"
                   formControlName="codigoPostal"
                   placeholder="Código Postal"
                   autocomplete="postal-code"
                   class="form-input"
                   [class.is-invalid]="isFieldInvalid('codigoPostal')">
            <div class="error-message" *ngIf="isFieldInvalid('codigoPostal')">
              <span *ngIf="registerForm.get('codigoPostal')?.errors?.['required']">El código postal es requerido</span>
            </div>
          </div>

          <div class="form-group">
            <input type="text"
                   id="poblacion"
                   name="poblacion"
                   formControlName="poblacion"
                   placeholder="Población"
                   class="form-input"
                   [class.is-invalid]="isFieldInvalid('poblacion')">
            <div class="error-message" *ngIf="isFieldInvalid('poblacion')">
              <span *ngIf="registerForm.get('poblacion')?.errors?.['required']">La población es requerida</span>
            </div>
          </div>

          <div class="form-group">
            <input type="text"
                   id="provincia"
                   name="provincia"
                   formControlName="provincia"
                   placeholder="Provincia"
                   class="form-input"
                   [class.is-invalid]="isFieldInvalid('provincia')">
            <div class="error-message" *ngIf="isFieldInvalid('provincia')">
              <span *ngIf="registerForm.get('provincia')?.errors?.['required']">La provincia es requerida</span>
            </div>
          </div>
        </div>

        <!-- 4. CONTACTO -->
        <div class="form-section" [class.hidden]="currentStep !== 3">
          <h2>4. CONTACTO</h2>
          
          <div class="form-group">
            <input type="tel"
                   id="telefono"
                   name="telefono"
                   formControlName="telefono"
                   placeholder="Teléfono"
                   autocomplete="tel"
                   class="form-input"
                   [class.is-invalid]="isFieldInvalid('telefono')">
            <div class="error-message" *ngIf="isFieldInvalid('telefono')">
              <span *ngIf="registerForm.get('telefono')?.errors?.['required']">El teléfono es requerido</span>
            </div>
          </div>
        </div>

        <!-- Botones de navegación -->
        <div class="navigation-buttons" *ngIf="currentStep > 0">
          <button type="button" 
                  class="prev-btn" 
                  (click)="previousStep()"
                  [disabled]="isLoading">
            Anterior
          </button>
          <button type="button" 
                  class="next-btn" 
                  *ngIf="currentStep < 3"
                  (click)="nextStep()" 
                  [disabled]="!isStepValid(currentStep) || isLoading">
            Siguiente
          </button>
          <button type="submit" 
                  class="submit-btn"
                  *ngIf="currentStep === 3"
                  [disabled]="!registerForm.valid || isLoading">
            <span *ngIf="!isLoading">Crear Cuenta</span>
            <div class="spinner" *ngIf="isLoading">
              <div class="loader"></div>
            </div>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-section {
      margin-bottom: 2rem;
    }

    h2 {
      color: #333;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #eee;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .form-input:focus {
      border-color: #0066cc;
      outline: none;
      box-shadow: 0 0 0 2px rgba(0,102,204,0.2);
    }

    .button-container {
      margin-top: 2rem;
      text-align: center;
    }

    .create-account-btn {
      background: #28a745;
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 4px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .create-account-btn:hover {
      background: #218838;
    }

    .create-account-btn:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }

    .password-strength {
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }

    .muy-debil { color: #e42233; }
    .debil { color: #ffa500; }
    .fuerte { color: #2ecc71; }
    .muy-fuerte { color: #27ae60; }

    .hidden {
      display: none;
    }

    .is-invalid {
      border-color: #dc3545;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .navigation-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
    }

    .prev-btn, .next-btn, .submit-btn {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-weight: 500;
    }

    .prev-btn {
      background-color: #6c757d;
      color: white;
    }

    .next-btn {
      background-color: #007bff;
      color: white;
    }

    .submit-btn {
      background-color: #28a745;
      color: white;
    }

    button:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    .alert {
      padding: 1rem;
      margin: 1rem auto;
      max-width: 800px;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .alert-danger {
      background-color: #fff3f3;
      border: 1px solid #f5c6cb;
      color: #721c24;
    }

    .alert a {
      color: #0066cc;
      text-decoration: underline;
    }

    .close-btn {
      background: none;
      border: none;
      color: #721c24;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0 0.5rem;
      margin-left: 1rem;
    }

    .spinner {
      display: inline-block;
      margin-left: 0.5rem;
    }

    .loader {
      width: 20px;
      height: 20px;
      border: 2px solid #f3f3f3;
      border-top: 2px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .form-group {
      position: relative;
    }

    .spinner {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }
    
    .password-input-container {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .toggle-password-btn {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: #666;
      font-size: 1rem;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .toggle-password-btn:hover {
      color: #333;
    }
    
    .toggle-password-btn:focus {
      outline: none;
    }
    
    .form-input {
      width: 100%;
      padding-right: 40px;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    nif: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    direccion: ['', Validators.required],
    codigoPostal: ['', Validators.required],
    poblacion: ['', Validators.required],
    provincia: ['', Validators.required],
    telefono: ['', Validators.required]
  });

  passwordStrength = '';
  currentStep = 0;
  isLoading = false;
  isCheckingEmail = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) {}

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
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.register(this.registerForm.value)
        .subscribe({
          next: (response) => {
            console.log('Registro exitoso:', response);
            this.router.navigate(['/verificacion']);
          },
          error: (error) => {
            console.error('Error en el registro:', error);
            this.isLoading = false;

            // Manejo específico de errores
            if (error.status === 409) {
              this.errorMessage = `
                El email ${this.registerForm.get('email')?.value} ya está registrado. 
                ¿Deseas iniciar sesión? <a href="/login">Haz clic aquí</a> 
                o utiliza otro email para registrarte.
              `;
            } else if (error.status === 500) {
              this.errorMessage = 'Ha ocurrido un error en el servidor. Por favor, inténtalo más tarde.';
            } else {
              this.errorMessage = 'Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.';
            }
          },
          complete: () => {
            this.isLoading = false;
          }
        });
    } else {
      // Mostrar errores de validación del formulario
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
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
               isValid('apellidos') && 
               isValid('nif') && 
               isValid('fechaNacimiento');
      case 2:
        return isValid('direccion') && 
               isValid('codigoPostal') && 
               isValid('poblacion') && 
               isValid('provincia');
      case 3:
        return isValid('telefono');
      default:
        return false;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
