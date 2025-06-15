"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
let ProfileComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-profile',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
            template: `
    <div class="profile-container">
      <h2>Mi Perfil</h2>
      
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
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ProfileComponent = _classThis = class {
        constructor(authService, router, fb) {
            this.authService = authService;
            this.router = router;
            this.fb = fb;
            this.userProfile = null;
            this.isEditing = false;
            this.isChangingPassword = false;
            this.loading = false;
            this.editForm = this.fb.group({
                nombre: ['', forms_1.Validators.required],
                apellido: ['', forms_1.Validators.required],
                telefono: ['']
            });
            this.passwordForm = this.fb.group({
                currentPassword: ['', forms_1.Validators.required],
                newPassword: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
                confirmPassword: ['', forms_1.Validators.required]
            }, {
                validators: this.passwordMatchValidator
            });
        }
        ngOnInit() {
            this.loadUserProfile();
        }
        loadUserProfile() {
            this.authService.getCurrentUser().subscribe({
                next: (profile) => {
                    this.userProfile = profile;
                    this.editForm.patchValue({
                        nombre: profile.nombre,
                        apellido: profile.apellido,
                        telefono: profile.telefono
                    });
                },
                error: (error) => {
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
                    error: (error) => {
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
                    error: (error) => {
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
                    error: (error) => {
                        console.error('Error al eliminar cuenta:', error);
                        this.loading = false;
                    }
                });
            }
        }
        passwordMatchValidator(group) {
            const newPassword = group.get('newPassword')?.value;
            const confirmPassword = group.get('confirmPassword')?.value;
            return newPassword === confirmPassword ? null : { passwordMismatch: true };
        }
    };
    __setFunctionName(_classThis, "ProfileComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProfileComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProfileComponent = _classThis;
})();
exports.ProfileComponent = ProfileComponent;
