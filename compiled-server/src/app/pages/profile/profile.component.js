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
      <div class="profile-header">
        <h2>Mi Perfil</h2>
        <button class="btn-logout" (click)="logout()">Cerrar Sesión</button>
      </div>

      <!-- Sección de Suscripciones -->
      <div class="subscriptions-section" *ngIf="!isEditing && !isChangingPassword">
        <h3>Mis Suscripciones</h3>
        <div *ngIf="loadingSubscriptions" class="loading-message">
          Cargando suscripciones...
        </div>
        <div *ngIf="!loadingSubscriptions && activeSubscriptions.length > 0" class="subscriptions-container">
          <div *ngFor="let subscription of activeSubscriptions" class="subscription-card">
            <div class="subscription-header">
              <h4>{{subscription.plan_name}}</h4>
              <span class="subscription-status status-active">
                {{subscription.status_display}}
              </span>
            </div>
            <div class="subscription-details">
              <div class="detail-row">
                <span class="detail-label">Plan:</span>
                <span class="detail-value">{{subscription.plan_id}}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Precio:</span>
                <span class="detail-value">{{subscription.price}}</span>
              </div>
              
              <!-- Información específica para Plan Básico -->
              <div *ngIf="subscription.is_basic_plan && subscription.predictions_used" class="basic-plan-info">
                <div class="detail-row">
                  <span class="detail-label">Fecha de contratación:</span>
                  <span class="detail-value">{{subscription.created_at | date:'dd/MM/yyyy'}}</span>
                </div>
                <h5 class="predictions-header">Pronósticos disponibles por juego:</h5>
                <div class="predictions-grid">
                  <div *ngFor="let game of subscription.predictions_used" class="prediction-card">
                    <div class="game-info">
                      <span class="game-name">{{game.game_name}}</span>
                      <div class="usage-stats">
                        <span class="used">{{game.used}}</span>
                        <span class="separator">/</span>
                        <span class="total">{{game.total_allowed}}</span>
                        <span class="label">utilizados</span>
                      </div>
                      <div class="remaining-count">
                        {{game.remaining}} restantes
                      </div>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" [style.width.%]="(game.used / game.total_allowed) * 100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div *ngIf="!loadingSubscriptions && activeSubscriptions.length === 0" class="no-subscriptions">
          <p>No tienes suscripciones activas actualmente.</p>
        </div>
      </div>
      
      <div *ngIf="userProfile" class="user-info">
        <div *ngIf="!isEditing">
          <h3>Información personal</h3>
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

    .profile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
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

    .subscriptions-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    .subscription-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .subscription-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #eee;
    }

    .subscription-status {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    .status-active {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.25rem 0;
    }

    .detail-label {
      font-weight: 600;
      color: #666;
      min-width: 150px;
    }

    .detail-value {
      color: #333;
      font-weight: 500;
    }

    .basic-plan-info {
      margin-top: 1rem;
    }

    .predictions-header {
      color: #333;
      margin: 1rem 0 0.75rem 0;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .predictions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
      margin-top: 0.75rem;
    }

    .prediction-card {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      padding: 1rem;
      transition: all 0.2s ease;
    }

    .game-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .game-name {
      font-weight: 600;
      color: #333;
      font-size: 0.95rem;
    }

    .usage-stats {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.9rem;
    }

    .usage-stats .used {
      font-weight: 700;
      color: #007bff;
    }

    .usage-stats .total {
      font-weight: 600;
      color: #666;
    }

    .remaining-count {
      font-size: 0.85rem;
      color: #28a745;
      font-weight: 600;
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background-color: #e9ecef;
      border-radius: 3px;
      margin-top: 0.5rem;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #007bff 0%, #0056b3 100%);
      border-radius: 3px;
      transition: width 0.3s ease;
    }

    @media (max-width: 768px) {
      .predictions-grid {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }
      
      .prediction-card {
        padding: 0.75rem;
      }
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
        this.loadingSubscriptions = false;
        this.activeSubscriptions = [];
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
            this.loadUserSubscriptions();
        }
        
        loadUserSubscriptions() {
            this.loadingSubscriptions = true;
            this.subscriptionService.hasActiveSubscription().subscribe({
                next: (hasActive) => {
                    this.loadingSubscriptions = false;
                    if (hasActive) {
                        const currentUser = this.authService.currentUserValue;
                        if (currentUser) {
                            this.subscriptionService.hasActivePlan('basic').subscribe(hasBasic => {
                                if (hasBasic) {
                                    this.activeSubscriptions = [{
                                        id: 1,
                                        plan_id: 'basic',
                                        plan_name: 'Plan Básico',
                                        status: 'active',
                                        status_display: 'Activo',
                                        created_at: new Date().toISOString(),
                                        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                                        price: '1,22€',
                                        is_basic_plan: true,
                                        predictions_used: this.generateBasicPlanUsageData()
                                    }];
                                }
                            });
                        }
                    } else {
                        this.activeSubscriptions = [];
                    }
                },
                error: (error) => {
                    console.error('Error al cargar suscripciones:', error);
                    this.loadingSubscriptions = false;
                    this.activeSubscriptions = [];
                }
            });
        }

        generateBasicPlanUsageData() {
            return [
                { game_id: 'euromillon', game_name: 'Euromillones', total_allowed: 3, used: 0, remaining: 3 },
                { game_id: 'primitiva', game_name: 'La Primitiva', total_allowed: 3, used: 0, remaining: 3 },
                { game_id: 'bonoloto', game_name: 'Bonoloto', total_allowed: 3, used: 0, remaining: 3 },
                { game_id: 'gordo', game_name: 'El Gordo', total_allowed: 3, used: 0, remaining: 3 },
                { game_id: 'eurodreams', game_name: 'EuroDreams', total_allowed: 3, used: 0, remaining: 3 },
                { game_id: 'lototurf', game_name: 'Lototurf', total_allowed: 3, used: 0, remaining: 3 },
                { game_id: 'loterianacional', game_name: 'Lotería Nacional', total_allowed: 3, used: 0, remaining: 3 }
            ];
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

        logout() {
            this.authService.logout();
            this.router.navigate(['/home']);
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
