import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService, Subscription } from '../../services/subscription.service';
import { UserPredictionService } from '../../services/user-prediction.service';
import { UserProfile } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { forkJoin } from 'rxjs';

// Interfaz para mostrar información de suscripciones
interface UserSubscriptionInfo {
  id: number;
  plan_id: string;
  plan_name: string;
  status: string;
  status_display: string;
  created_at: string;
  expires_at: string;
  price: string;
  // Para Plan Básico - tracking de pronósticos
  is_basic_plan?: boolean;
  predictions_used?: GamePredictionUsage[];
}

// Interfaz para tracking de pronósticos por juego (Plan Básico)
interface GamePredictionUsage {
  game_id: string;
  game_name: string;
  total_allowed: number;
  used: number;
  remaining: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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
              <span class="subscription-status" [class]="getStatusClass(subscription.status)">
                {{subscription.status_display}}
              </span>
            </div>
            <div class="subscription-details">
              <div class="detail-row">
                <span class="detail-label">Plan:</span>
                <span class="detail-value">{{subscription.plan_id | titlecase}}</span>
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
                      <div class="remaining-count" [class.low-remaining]="game.remaining <= 1">
                        {{game.remaining}} restantes
                      </div>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" [style.width.%]="(game.used / game.total_allowed) * 100"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Información para planes temporales (Mensual/Pro) -->
              <div *ngIf="!subscription.is_basic_plan">
                <div class="detail-row">
                  <span class="detail-label">Fecha de contratación:</span>
                  <span class="detail-value">{{subscription.created_at | date:'dd/MM/yyyy'}}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Fecha de caducidad:</span>
                  <span class="detail-value">{{subscription.expires_at | date:'dd/MM/yyyy'}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div *ngIf="!loadingSubscriptions && activeSubscriptions.length === 0" class="no-subscriptions">
          <p>No tienes suscripciones activas actualmente.</p>
          <button class="btn-primary" routerLink="/planes">Ver planes disponibles</button>
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
        <button routerLink="/historial-predicciones" class="btn-secondary">Ver tu historial de predicciones</button>
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

    .profile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .profile-header h2 {
      color: #333;
      margin: 0;
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

    .btn-logout:hover {
      background-color: #c82333;
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

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #5a6268;
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

    /* Estilos para la sección de suscripciones */
    .subscriptions-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    .subscriptions-section h3 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    .loading-message {
      text-align: center;
      color: #666;
      font-style: italic;
      padding: 1rem;
    }

    .subscriptions-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
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

    .subscription-header h4 {
      margin: 0;
      color: #333;
      font-size: 1.2rem;
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

    .status-inactive {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .status-expired {
      background-color: #fff3cd;
      color: #856404;
      border: 1px solid #ffeaa7;
    }

    .status-cancelled {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .subscription-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
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

    .no-subscriptions {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .no-subscriptions p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .user-info h3 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 1.3rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.5rem;
    }

    /* Estilos específicos para Plan Básico */
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

    .prediction-card:hover {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

    .usage-stats .separator {
      color: #999;
      font-weight: 600;
    }

    .usage-stats .label {
      color: #666;
      font-size: 0.85rem;
    }

    .remaining-count {
      font-size: 0.85rem;
      color: #28a745;
      font-weight: 600;
    }

    .remaining-count.low-remaining {
      color: #dc3545;
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
      .subscription-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .detail-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }

      .detail-label {
        min-width: auto;
        font-size: 0.9rem;
      }

      .predictions-grid {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }

      .prediction-card {
        padding: 0.75rem;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  isEditing = false;
  isChangingPassword = false;
  loading = false;
  editForm: FormGroup;
  passwordForm: FormGroup;
  loadingSubscriptions = false;
  activeSubscriptions: UserSubscriptionInfo[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
    private userPredictionService: UserPredictionService,
    private cdr: ChangeDetectorRef
  ) {
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    this.loadUserProfile();
    this.loadUserSubscriptions();
  }

  private loadUserProfile() {
    this.authService.getCurrentUser().subscribe({
      next: (response) => {
        if (response && response.user) {
          // Extraer nombre y apellido desde response.user
          const user = response.user;
          this.userProfile = {
            id: user.id.toString(),
            nombre: user.nombre || this.extractFirstName(user.name) || '',
            apellido: user.apellido || this.extractLastName(user.name) || '',
            email: user.email,
            telefono: user.telefono,
            fechaRegistro: user.fechaRegistro || new Date()
          };
          
          this.editForm.patchValue({
            nombre: this.userProfile.nombre,
            apellido: this.userProfile.apellido,
            telefono: this.userProfile.telefono
          });
        } else {
          // Intentar usar el usuario actual del servicio como fallback
          const currentUser = this.authService.currentUserValue;
          if (currentUser) {
            this.userProfile = {
              id: currentUser.id.toString(),
              nombre: currentUser.nombre || this.extractFirstName(currentUser.name) || '',
              apellido: currentUser.apellido || this.extractLastName(currentUser.name) || '',
              email: currentUser.email,
              telefono: currentUser.telefono,
              fechaRegistro: new Date() // Valor por defecto
            };
            this.editForm.patchValue({
              nombre: this.userProfile.nombre,
              apellido: this.userProfile.apellido,
              telefono: this.userProfile.telefono
            });
          } else {
            console.error('Usuario actual no disponible');
          }
        }
      },
      error: (error: any) => {
        console.error('Error al cargar perfil de usuario:', error);
        this.loading = false;
        
        // Fallback usando datos del token
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
          this.userProfile = {
            id: currentUser.id.toString(),
            nombre: currentUser.nombre || this.extractFirstName(currentUser.name) || '',
            apellido: currentUser.apellido || this.extractLastName(currentUser.name) || '',
            email: currentUser.email,
            telefono: currentUser.telefono,
            fechaRegistro: new Date()
          };
          this.editForm.patchValue({
            nombre: this.userProfile.nombre,
            apellido: this.userProfile.apellido,
            telefono: this.userProfile.telefono
          });
        }
      }
    });
  }

  /**
   * Extrae el nombre desde un campo 'name' completo
   * Ejemplos: "Pedro Julian Martín Velasco" → "Pedro Julian"
   */
  private extractFirstName(fullName: string): string {
    if (!fullName) return '';
    
    const nameParts = fullName.trim().split(' ').filter(part => part.length > 0);
    
    if (nameParts.length === 0) return '';
    if (nameParts.length === 1) return nameParts[0];
    if (nameParts.length === 2) return nameParts[0]; // Nombre + Apellido
    
    // Para 3+ palabras, asumir que las primeras 2 son el nombre
    return `${nameParts[0]} ${nameParts[1]}`;
  }

  /**
   * Extrae el/los apellido(s) desde un campo 'name' completo  
   * Ejemplos: "Pedro Julian Martín Velasco" → "Martín Velasco"
   */
  private extractLastName(fullName: string): string {
    if (!fullName) return '';
    
    const nameParts = fullName.trim().split(' ').filter(part => part.length > 0);
    
    if (nameParts.length <= 1) return '';
    if (nameParts.length === 2) return nameParts[1]; // Nombre + Apellido
    
    // Para 3+ palabras, asumir que todo después de las primeras 2 palabras son apellidos
    return nameParts.slice(2).join(' ');
  }

  private loadUserSubscriptions() {
    console.log('🚀 [PROFILE] Iniciando loadUserSubscriptions...');
    this.loadingSubscriptions = true;
    
    this.subscriptionService.getUserSubscriptions().subscribe({
      next: (subscriptions: Subscription[]) => {
        console.log('📨 [PROFILE] Respuesta de getUserSubscriptions:', subscriptions);
        console.log('📨 [PROFILE] subscriptions.length:', subscriptions?.length);
        console.log('📨 [PROFILE] Es array?:', Array.isArray(subscriptions));
        
        this.loadingSubscriptions = false;
        
        if (!subscriptions || subscriptions.length === 0) {
          // Usuario sin suscripciones - Plan Básico por defecto
          console.log('🔄 [PROFILE] No se encontraron suscripciones, cargando Plan Básico...');
          this.loadBasicPlanData();
        } else {
          // Verificar si todas las suscripciones son del Plan Básico
          const hasOnlyBasicPlan = subscriptions.every((sub: any) => 
            !sub.planId || sub.planId === 'basic' || sub.planId === ''
          );
          
          console.log('🔍 [PROFILE] Análisis de suscripciones:');
          subscriptions.forEach((sub: any, index) => {
            console.log(`📋 [PROFILE] Suscripción ${index}:`, {
              id: sub.id,
              planId: sub.planId,
              status: sub.status,
              startDate: sub.startDate,
              endDate: sub.endDate
            });
          });
          console.log('🔍 [PROFILE] ¿Solo Plan Básico?:', hasOnlyBasicPlan);
          
          if (hasOnlyBasicPlan) {
            // Todas las suscripciones son del Plan Básico - cargar predicciones
            console.log('🔄 [PROFILE] Solo Plan Básico encontrado, cargando predicciones...');
            this.loadBasicPlanData();
          } else {
            // Suscripciones premium/temporales encontradas
            console.log('💎 [PROFILE] Suscripciones premium encontradas:', subscriptions);
            this.activeSubscriptions = subscriptions.map((sub: any) => ({
              id: sub.id,
              plan_id: sub.planId,
              plan_name: this.getPlanDisplayName(sub.planId),
              status: sub.status,
              status_display: this.getStatusDisplayName(sub.status),
              created_at: sub.startDate,
              expires_at: sub.endDate,
              price: this.getPlanPrice(sub.planId),
              is_basic_plan: false
            }));
            console.log('💎 [PROFILE] activeSubscriptions mapeadas:', this.activeSubscriptions);
          }
        }
      },
      error: (error: any) => {
        console.error('❌ [PROFILE] Error al cargar suscripciones:', error);
        console.error('❌ [PROFILE] Error detallado:', {
          message: error.message,
          status: error.status,
          url: error.url
        });
        this.loadingSubscriptions = false;
        
        // Si hay error, asumir Plan Básico como fallback
        console.log('🔄 [PROFILE] Error al cargar suscripciones, usando Plan Básico como fallback...');
        this.loadBasicPlanData();
      }
    });
  }

  /**
   * Carga datos del Plan Básico con información real de predicciones
   */
  private loadBasicPlanData() {
    console.log('🔍 [PROFILE] Cargando datos del Plan Básico...');
    
    this.loadingSubscriptions = true;
    
    this.userPredictionService.getProfilePredictionSummary().subscribe({
      next: (response) => {
        console.log('📊 [PROFILE] Respuesta del servidor:', response);
        console.log('📊 [PROFILE] response.success:', response.success);
        console.log('📊 [PROFILE] response.data:', response.data);
        console.log('📊 [PROFILE] response.data.games:', response.data?.games);
        console.log('📊 [PROFILE] Es Array?:', Array.isArray(response.data?.games));
        
        if (response.success && response.data && response.data.games && Array.isArray(response.data.games)) {
          console.log('✅ [PROFILE] Datos válidos recibidos, games:', response.data.games);
          
          const subscription: UserSubscriptionInfo = {
            id: 0,
            plan_id: 'basic',
            plan_name: 'Plan Básico',
            status: 'active',
            status_display: 'Activo',
            created_at: new Date().toISOString(),
            expires_at: '',
            price: '1,22€',
            is_basic_plan: true,
            predictions_used: response.data.games
          };

          this.activeSubscriptions = [subscription];
          console.log('🎯 [PROFILE] Suscripción creada con predicciones:', subscription);
          console.log('🎯 [PROFILE] activeSubscriptions[0].is_basic_plan:', this.activeSubscriptions[0]?.is_basic_plan);
          console.log('🎯 [PROFILE] activeSubscriptions[0].predictions_used:', this.activeSubscriptions[0]?.predictions_used);
          console.log('🎯 [PROFILE] Longitud predictions_used:', this.activeSubscriptions[0]?.predictions_used?.length);
          
        } else {
          console.warn('⚠️ [PROFILE] Respuesta inválida, usando datos por defecto');
          console.warn('⚠️ [PROFILE] Detalles - success:', response.success, 'data:', response.data, 'games:', response.data?.games);
          this.activeSubscriptions = [this.createDefaultBasicPlan()];
          console.log('📋 [PROFILE] Plan básico por defecto creado:', this.activeSubscriptions[0]);
        }
        
        this.loadingSubscriptions = false;
        // Forzar detección de cambios de manera segura para SSR
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        
        // Verificar estado final
        console.log('🔚 [PROFILE] Estado final - activeSubscriptions:', this.activeSubscriptions);
        console.log('🔚 [PROFILE] Estado final - loadingSubscriptions:', this.loadingSubscriptions);
      },
      error: (error) => {
        console.error('❌ [PROFILE] Error cargando predicciones:', error);
        console.error('❌ [PROFILE] Error detallado:', {
          message: error.message,
          status: error.status,
          url: error.url
        });
        this.activeSubscriptions = [this.createDefaultBasicPlan()];
        this.loadingSubscriptions = false;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        console.log('📋 [PROFILE] Plan básico por defecto tras error:', this.activeSubscriptions[0]);
      }
    });
  }

  private createDefaultBasicPlan(): UserSubscriptionInfo {
    return {
      id: 0,
      plan_id: 'basic',
      plan_name: 'Plan Básico',
      status: 'active',
      status_display: 'Activo',
      created_at: new Date().toISOString(),
      expires_at: '',
      price: '1,22€',
      is_basic_plan: true,
      predictions_used: this.getDefaultPredictionData()
    };
  }

  private getPlanDisplayName(planId: string): string {
    switch (planId) {
      case 'basic': return 'Plan Básico';
      case 'monthly': return 'Plan Mensual';
      case 'pro': return 'Plan Pro';
      default: return planId;
    }
  }

  private getStatusDisplayName(status: string): string {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'expired': return 'Expirado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  }

  private getPlanPrice(planId: string): string {
    switch (planId) {
      case 'basic': return '1,22€';
      case 'monthly': return '10,22€';
      case 'pro': return '122€';
      default: return 'N/A';
    }
  }

  /**
   * Datos por defecto si falla la carga desde el backend
   */
  private getDefaultPredictionData(): GamePredictionUsage[] {
    return [
      {
        game_id: 'euromillon',
        game_name: 'Euromillones',
        total_allowed: 3,
        used: 0,
        remaining: 3
      },
      {
        game_id: 'primitiva',
        game_name: 'La Primitiva',
        total_allowed: 3,
        used: 0,
        remaining: 3
      },
      {
        game_id: 'bonoloto',
        game_name: 'Bonoloto',
        total_allowed: 3,
        used: 0,
        remaining: 3
      },
      {
        game_id: 'elgordo',
        game_name: 'El Gordo',
        total_allowed: 3,
        used: 0,
        remaining: 3
      },
      {
        game_id: 'eurodreams',
        game_name: 'EuroDreams',
        total_allowed: 3,
        used: 0,
        remaining: 3
      },
      {
        game_id: 'lototurf',
        game_name: 'Lototurf',
        total_allowed: 3,
        used: 0,
        remaining: 3
      },
      {
        game_id: 'loterianacional',
        game_name: 'Lotería Nacional',
        total_allowed: 3,
        used: 0,
        remaining: 3
      }
    ];
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'expired': return 'status-expired';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-unknown';
    }
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
        error: (error: any) => {
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
        error: (error: any) => {
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
        error: (error: any) => {
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

  private passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
}
