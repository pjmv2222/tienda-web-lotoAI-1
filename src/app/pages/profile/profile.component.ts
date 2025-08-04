import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService, Subscription } from '../../services/subscription.service';
import { UserPredictionService } from '../../services/user-prediction.service';
import { UserProfile } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { forkJoin, map } from 'rxjs';

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
        
        <!-- Sistema de pestañas -->
        <div *ngIf="!loadingSubscriptions && activeSubscriptions.length > 0" class="tabs-container">
          <div class="tabs-header">
            <button 
              *ngFor="let tab of availableTabs" 
              class="tab-button"
              [class.active]="isTabActive(tab)"
              (click)="setActiveTab(tab)">
              {{getTabDisplayName(tab)}}
            </button>
          </div>
          
          <!-- Contenido de la pestaña activa -->
          <div class="tab-content">
            <!-- Vista general (overview) -->
            <div *ngIf="activeTab === 'overview'" class="overview-content">
              <div class="overview-summary">
                <h4>Resumen de tus planes activos</h4>
                <div class="plans-summary">
                  <div *ngFor="let subscription of activeSubscriptions" class="plan-summary-card">
                    <h5>{{subscription.plan_name}}</h5>
                    <div class="summary-details">
                      <span class="price">{{subscription.price}}</span>
                      <span class="status" [class]="getStatusClass(subscription.status)">
                        {{subscription.status_display}}
                      </span>
                    </div>
                  </div>
                </div>
                <p class="overview-note">
                  Selecciona una pestaña arriba para ver los detalles específicos de cada plan.
                </p>
              </div>
            </div>
            
            <!-- Vista específica del plan seleccionado -->
            <div *ngIf="activeTab !== 'overview'" class="plan-content">
              <div *ngFor="let subscription of getSubscriptionsForTab(activeTab)" class="subscription-detail">
                <div class="plan-header">
                  <h4>{{subscription.plan_name}}</h4>
                  <span class="subscription-status" [class]="getStatusClass(subscription.status)">
                    {{subscription.status_display}}
                  </span>
                </div>
                
                <div class="plan-info">
                  <div class="detail-row">
                    <span class="detail-label">Precio:</span>
                    <span class="detail-value price-highlight">{{subscription.price}}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Fecha de contratación:</span>
                    <span class="detail-value">{{subscription.created_at | date:'dd/MM/yyyy'}} ({{subscription.created_at}})</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">{{getExpirationLabel(subscription.plan_id)}}:</span>
                    <span class="detail-value">{{getExpirationValue(subscription)}} ({{subscription.expires_at}})</span>
                  </div>
                </div>
                
                <!-- Información específica para Plan Básico -->
                <div *ngIf="subscription.is_basic_plan && subscription.predictions_used" class="basic-plan-details">
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
                <div *ngIf="!subscription.is_basic_plan" class="premium-plan-details">
                  <h5>Características del {{subscription.plan_name}}:</h5>
                  <div class="plan-features">
                    <div class="feature-item">
                      <i class="feature-icon">✓</i>
                      <span>Acceso ilimitado a todos los juegos</span>
                    </div>
                    <div class="feature-item">
                      <i class="feature-icon">✓</i>
                      <span>Pronósticos sin límite de uso</span>
                    </div>
                    <div class="feature-item">
                      <i class="feature-icon">✓</i>
                      <span>Análisis avanzados con IA</span>
                    </div>
                    <div class="feature-item" *ngIf="isProPlan(subscription)">
                      <i class="feature-icon">✓</i>
                      <span>Soporte prioritario</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Vista cuando solo hay un plan o no hay pestañas -->
        <!-- TEMPORALMENTE COMENTADO PARA TESTING DE PESTAÑAS
        <div *ngIf="!loadingSubscriptions && availableTabs.length <= 1 && activeSubscriptions.length > 0" class="single-plan-view">
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
        -->
        
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

    /* Estilos para el sistema de pestañas */
    .tabs-container {
      margin-bottom: 1.5rem;
    }

    .tabs-header {
      display: flex;
      border-bottom: 2px solid #e0e0e0;
      margin-bottom: 1rem;
      overflow-x: auto;
    }

    .tab-button {
      background: none;
      border: none;
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 500;
      color: #666;
      border-bottom: 3px solid transparent;
      transition: all 0.3s ease;
      white-space: nowrap;
      min-width: fit-content;
    }

    .tab-button:hover {
      background-color: #f5f5f5;
      color: #333;
    }

    .tab-button.active {
      color: #007bff;
      border-bottom-color: #007bff;
      background-color: #fff;
    }

    /* Estilos para el contenido de las pestañas */
    .tab-content {
      min-height: 300px;
      padding: 1rem 0;
    }

    .overview-content {
      text-align: center;
    }

    .overview-summary h4 {
      color: #333;
      margin-bottom: 1.5rem;
    }

    .plans-summary {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 2rem;
    }

    .plan-summary-card {
      background: #fff;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      padding: 1rem;
      min-width: 150px;
      text-align: center;
    }

    .plan-summary-card h5 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1rem;
    }

    .summary-details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .summary-details .price {
      font-weight: bold;
      color: #007bff;
      font-size: 1.1rem;
    }

    .overview-note {
      color: #666;
      font-style: italic;
      margin: 0;
    }

    .plan-content {
      background: #fff;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .subscription-detail {
      width: 100%;
    }

    .plan-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #f0f0f0;
    }

    .plan-header h4 {
      margin: 0;
      color: #333;
      font-size: 1.4rem;
    }

    .plan-info {
      margin-bottom: 2rem;
    }

    .price-highlight {
      color: #007bff;
      font-weight: bold;
      font-size: 1.1rem;
    }

    .basic-plan-details h5,
    .premium-plan-details h5 {
      color: #333;
      margin: 1.5rem 0 1rem 0;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .plan-features {
      display: grid;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .feature-icon {
      color: #28a745;
      font-weight: bold;
      font-size: 1.1rem;
      width: 20px;
      text-align: center;
    }

    .single-plan-view {
      padding: 1rem 0;
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

      /* Responsivo para pestañas */
      .tabs-header {
        flex-direction: column;
        border-bottom: none;
        gap: 0.5rem;
      }

      .tab-button {
        border: 1px solid #ddd;
        border-radius: 4px;
        text-align: center;
        border-bottom: 1px solid #ddd;
      }

      .tab-button.active {
        border-color: #007bff;
        background-color: #007bff;
        color: white;
      }

      /* Responsivo para contenido de pestañas */
      .plans-summary {
        flex-direction: column;
        align-items: center;
      }

      .plan-summary-card {
        width: 100%;
        max-width: 300px;
      }

      .plan-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .plan-content {
        padding: 1rem;
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
  
  // Variables para el sistema de pestañas
  activeTab: string = 'overview';
  availableTabs: string[] = [];

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
          // CORRECCIÓN: Mostrar TODAS las suscripciones activas, incluyendo múltiples planes
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
          
          // NUEVO: Mostrar TODAS las suscripciones activas sin filtrar
          console.log('� [PROFILE] Procesando todas las suscripciones activas...');
          
          // Mapear todas las suscripciones a formato de display
          this.activeSubscriptions = subscriptions.map((sub: any) => {
          console.log('🔍 [PROFILE] Mapeo de suscripción (CORREGIDO):', {
            id: sub.id,
            planId: sub.planId,
            planIdFromId: sub.id, // El planId real está en sub.id
            planName: this.getPlanDisplayName(sub.id),
            status: sub.status,
            startDate: sub.startDate,
            endDate: sub.endDate,
            startDateType: typeof sub.startDate,
            endDateType: typeof sub.endDate
          });            
          
          // CORRECCIÓN: Usar sub.id como plan_id porque es donde está el ID del plan
            const planId = sub.id;
            const tabId = this.getTabIdFromPlanId(planId);
            const isBasicPlan = tabId === 'basic';
            
            // CORRECCIÓN CRÍTICA: Convertir fechas al formato correcto para Angular
            const startDate = sub.startDate ? new Date(sub.startDate).toISOString() : new Date().toISOString();
            const endDate = sub.endDate ? new Date(sub.endDate).toISOString() : '';
            
            console.log('📅 [PROFILE] Fechas procesadas:', {
              original_startDate: sub.startDate,
              original_endDate: sub.endDate,
              processed_startDate: startDate,
              processed_endDate: endDate
            });
            
            return {
              id: sub.id,
              plan_id: planId, // Usar sub.id como plan_id
              plan_name: this.getPlanDisplayName(planId),
              status: sub.status,
              status_display: this.getStatusDisplayName(sub.status),
              created_at: startDate,
              expires_at: endDate,
              price: this.getPlanPrice(planId),
              is_basic_plan: isBasicPlan,
              predictions_used: isBasicPlan ? [] : undefined // Solo para básico, se cargará después
            };
          });
          
          // CORRECCIÓN CRÍTICA: Si hay un plan básico, cargar los datos de predicciones
          // Si NO hay plan básico en las suscripciones de la BD, pero debería haberlo, agregarlo
          const basicPlan = this.activeSubscriptions.find(sub => sub.is_basic_plan);
          if (basicPlan) {
            console.log('🔄 [PROFILE] Plan básico encontrado en BD, cargando datos de predicciones...');
            this.loadBasicPlanPredictions();
          } else {
            console.log('🔄 [PROFILE] No hay plan básico en BD, cargando plan básico por defecto...');
            this.loadBasicPlanDataAndMerge();
          }
          
          console.log('📊 [PROFILE] activeSubscriptions final:', this.activeSubscriptions);
          
          // Actualizar pestañas disponibles
          this.updateAvailableTabs();
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
        
        // Actualizar pestañas disponibles
        this.updateAvailableTabs();
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

  /**
   * Carga datos del Plan Básico y los combina con suscripciones premium existentes
   */
  private loadBasicPlanDataAndMerge(): void {
    console.log('🔄 [PROFILE] Cargando datos del Plan Básico para combinar con planes premium...');
    
    // CORRECCIÓN: Hacer ambas consultas en paralelo - predicciones Y suscripción básica de la BD
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      console.error('❌ [PROFILE] No hay usuario autenticado');
      return;
    }

    const predictionSummary$ = this.userPredictionService.getProfilePredictionSummary();
    const basicSubscription$ = this.subscriptionService.getUserSubscriptions().pipe(
      map((subs: any[]) => subs.find(sub => sub.id === 'basic' || sub.planId === 'basic'))
    );

    forkJoin({
      predictions: predictionSummary$,
      basicSub: basicSubscription$
    }).subscribe({
      next: (result) => {
        console.log('📊 [PROFILE] Respuesta combinada:', result);
        
        let basicPlanData: UserSubscriptionInfo;
        
        // Usar fechas reales de la BD si están disponibles
        const realStartDate = result.basicSub?.startDate || new Date().toISOString();
        const realEndDate = result.basicSub?.endDate || '';
        
        if (result.predictions.success && result.predictions.data && result.predictions.data.games && Array.isArray(result.predictions.data.games)) {
          console.log('✅ [PROFILE] Datos válidos recibidos para combinar, games:', result.predictions.data.games);
          
          basicPlanData = {
            id: 0,
            plan_id: 'basic',
            plan_name: 'Plan Básico',
            status: 'active',
            status_display: 'Activo',
            created_at: realStartDate, // ✅ USAR FECHA REAL DE LA BD
            expires_at: realEndDate,   // ✅ USAR FECHA REAL DE LA BD
            price: '1,22€',
            is_basic_plan: true,
            predictions_used: result.predictions.data.games
          };
        } else {
          console.warn('⚠️ [PROFILE] Respuesta inválida para combinar, usando datos por defecto');
          const defaultPlan = this.createDefaultBasicPlan();
          // Pero usar fechas reales si están disponibles
          defaultPlan.created_at = realStartDate;
          defaultPlan.expires_at = realEndDate;
          basicPlanData = defaultPlan;
        }
        
        // Agregar plan básico al array existente de suscripciones premium
        this.activeSubscriptions.push(basicPlanData);
        
        console.log('✅ [PROFILE] Plan Básico agregado a suscripciones existentes:', this.activeSubscriptions);
        console.log('📊 [PROFILE] Total de suscripciones activas:', this.activeSubscriptions.length);
        
        // Actualizar pestañas disponibles después de agregar el plan básico
        this.updateAvailableTabs();
        
        // Forzar detección de cambios
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ [PROFILE] Error cargando predicciones para combinar:', error);
        
        // Agregar Plan Básico por defecto en caso de error
        const basicPlanData = this.createDefaultBasicPlan();
        this.activeSubscriptions.push(basicPlanData);
        
        console.log('✅ [PROFILE] Plan Básico por defecto agregado tras error:', this.activeSubscriptions);
        
        // Actualizar pestañas disponibles
        this.updateAvailableTabs();
        
        // Forzar detección de cambios
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Carga datos de predicciones específicamente para el plan básico
   */
  private loadBasicPlanPredictions(): void {
    console.log('🔄 [PROFILE] Cargando predicciones del Plan Básico...');
    
    this.userPredictionService.getProfilePredictionSummary().subscribe({
      next: (response) => {
        console.log('📊 [PROFILE] Respuesta del servidor para Plan Básico:', response);
        
        if (response.success && response.data && response.data.games && Array.isArray(response.data.games)) {
          console.log('✅ [PROFILE] Datos válidos recibidos para Plan Básico, games:', response.data.games);
          
          // CORRECCIÓN: Buscar la suscripción básica existente y actualizar sus datos
          const basicSubscriptionIndex = this.activeSubscriptions.findIndex(sub => sub.is_basic_plan);
          
          if (basicSubscriptionIndex !== -1) {
            // Actualizar la suscripción básica existente con los datos de predicciones
            this.activeSubscriptions[basicSubscriptionIndex].predictions_used = response.data.games;
            console.log('✅ [PROFILE] Datos de predicciones actualizados para plan básico existente');
          } else {
            // Si no existe plan básico en las suscripciones, agregarlo
            const basicPlanData: UserSubscriptionInfo = {
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
            
            this.activeSubscriptions.push(basicPlanData);
            console.log('✅ [PROFILE] Plan Básico agregado a suscripciones existentes');
          }
          
        } else {
          console.warn('⚠️ [PROFILE] Respuesta inválida para Plan Básico, usando datos por defecto');
          
          // Buscar plan básico y actualizar con datos por defecto
          const basicSubscriptionIndex = this.activeSubscriptions.findIndex(sub => sub.is_basic_plan);
          
          if (basicSubscriptionIndex !== -1) {
            this.activeSubscriptions[basicSubscriptionIndex].predictions_used = this.getDefaultPredictionData();
          } else {
            const basicPlanData = this.createDefaultBasicPlan();
            this.activeSubscriptions.push(basicPlanData);
          }
        }
        
        console.log('📊 [PROFILE] Suscripciones activas finales (con Plan Básico):', this.activeSubscriptions.length);
        console.log('📊 [PROFILE] Detalles:', this.activeSubscriptions.map(sub => ({ plan_id: sub.plan_id, plan_name: sub.plan_name })));
        
        // Actualizar pestañas disponibles después de agregar el plan básico
        this.updateAvailableTabs();
        
        // Forzar detección de cambios
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ [PROFILE] Error cargando predicciones del Plan Básico:', error);
        
        // En caso de error, agregar Plan Básico por defecto si no existe
        const basicSubscriptionIndex = this.activeSubscriptions.findIndex(sub => sub.is_basic_plan);
        
        if (basicSubscriptionIndex !== -1) {
          this.activeSubscriptions[basicSubscriptionIndex].predictions_used = this.getDefaultPredictionData();
        } else {
          const basicPlanData = this.createDefaultBasicPlan();
          this.activeSubscriptions.push(basicPlanData);
        }
        
        console.log('✅ [PROFILE] Plan Básico por defecto agregado tras error');
        
        // Actualizar pestañas disponibles
        this.updateAvailableTabs();
        
        // Forzar detección de cambios
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      }
    });
  }

  private getPlanDisplayName(planId: string | number): string {
    // Convertir a string para comparación consistente
    const planIdStr = String(planId);
    
    switch (planIdStr) {
      case 'basic':
      case '10': // ID del Plan Básico
        return 'Plan Básico';
      case 'monthly':
      case '7': // ID del Plan Mensual
        return 'Plan Mensual';
      case 'pro':
      case '12': // ID del Plan Pro
        return 'Plan Pro';
      default:
        console.warn('⚠️ [PROFILE] Plan ID desconocido:', planId);
        return `Plan ${planId}`;
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

  private getPlanPrice(planId: string | number): string {
    // Convertir a string para comparación consistente
    const planIdStr = String(planId);
    
    switch (planIdStr) {
      case 'basic':
      case '10': // ID del Plan Básico
        return '1,22€';
      case 'monthly':
      case '7': // ID del Plan Mensual
        return '10,22€';
      case 'pro':
      case '12': // ID del Plan Pro
        return '122€';
      default:
        console.warn('⚠️ [PROFILE] Plan ID desconocido para precio:', planId);
        return 'N/A';
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

  /**
   * Verifica si una suscripción corresponde al Plan Pro
   */
  isProPlan(subscription: UserSubscriptionInfo): boolean {
    const tabId = this.getTabIdFromPlanId(subscription.plan_id);
    return tabId === 'pro';
  }

  /**
   * Convierte un plan ID (numérico o string) a un tab ID para el sistema de pestañas
   */
  private getTabIdFromPlanId(planId: string | number): string {
    const planIdStr = String(planId);
    
    switch (planIdStr) {
      case 'basic':
      case '10': // ID del Plan Básico
        return 'basic';
      case 'monthly':
      case '7': // ID del Plan Mensual
        return 'monthly';
      case 'pro':
      case '12': // ID del Plan Pro
        return 'pro';
      default:
        console.warn('⚠️ [PROFILE] Plan ID desconocido para tab:', planId);
        return `plan-${planId}`;
    }
  }

  /**
   * Actualiza las pestañas disponibles basándose en las suscripciones activas
   */
  private updateAvailableTabs(): void {
    console.log('🔄 [PROFILE] Actualizando pestañas disponibles...');
    console.log('🔄 [PROFILE] activeSubscriptions:', this.activeSubscriptions);
    
    this.availableTabs = ['overview']; // Siempre incluir resumen general
    
    // Agregar pestañas según los planes activos
    this.activeSubscriptions.forEach((sub, index) => {
      console.log(`📋 [PROFILE] Procesando suscripción ${index} (CORREGIDO):`, {
        id: sub.id,
        plan_id: sub.plan_id,
        plan_name: sub.plan_name,
        tabId: this.getTabIdFromPlanId(sub.plan_id)
      });
      
      if (sub.plan_id !== undefined && sub.plan_id !== null) {
        const tabId = this.getTabIdFromPlanId(sub.plan_id);
        if (!this.availableTabs.includes(tabId)) {
          this.availableTabs.push(tabId);
          console.log(`✅ [PROFILE] Agregada pestaña: ${tabId} (plan_id: ${sub.plan_id})`);
        }
      } else {
        console.warn(`⚠️ [PROFILE] plan_id es undefined para suscripción ${index}:`, sub);
      }
    });
    
    console.log('📋 [PROFILE] Pestañas disponibles finales:', this.availableTabs);
    console.log('📋 [PROFILE] Pestaña activa actual:', this.activeTab);
    
    // Si la pestaña activa no está disponible, cambiar a overview
    if (!this.availableTabs.includes(this.activeTab)) {
      console.log('⚠️ [PROFILE] Pestaña activa no válida, cambiando a overview');
      this.activeTab = 'overview';
    }
    
    console.log('📋 [PROFILE] Pestaña activa final:', this.activeTab);
  }

  /**
   * Cambia la pestaña activa
   */
  setActiveTab(tabId: string): void {
    if (this.availableTabs.includes(tabId)) {
      this.activeTab = tabId;
      console.log('📋 [PROFILE] Pestaña activa cambiada a:', this.activeTab);
    }
  }

  /**
   * Obtiene el nombre de display para una pestaña
   */
  getTabDisplayName(tabId: string): string {
    switch (tabId) {
      case 'overview': return 'Resumen General';
      case 'basic': return 'Plan Básico';
      case 'monthly': return 'Plan Mensual';
      case 'pro': return 'Plan Pro';
      default: return tabId;
    }
  }

  /**
   * Obtiene las suscripciones para una pestaña específica
   */
  getSubscriptionsForTab(tabId: string): UserSubscriptionInfo[] {
    if (tabId === 'overview') {
      return this.activeSubscriptions;
    }
    
    // Filtrar suscripciones que corresponden al tabId
    return this.activeSubscriptions.filter(sub => {
      const subTabId = this.getTabIdFromPlanId(sub.plan_id);
      return subTabId === tabId;
    });
  }

  /**
   * Verifica si una pestaña está activa
   */
  isTabActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }

  /**
   * Obtiene la etiqueta de expiración según el tipo de plan
   */
  getExpirationLabel(planId: string | number): string {
    const planIdStr = String(planId);
    const tabId = this.getTabIdFromPlanId(planIdStr);
    
    switch (tabId) {
      case 'basic': return 'Vigencia';
      case 'monthly': return 'Fecha de caducidad';
      case 'pro': return 'Fecha de caducidad';
      default: return 'Vencimiento';
    }
  }

  /**
   * Obtiene el valor de expiración formateado según el tipo de plan
   */
  getExpirationValue(subscription: UserSubscriptionInfo): string {
    console.log('🔍 [PROFILE] getExpirationValue llamado con:', {
      plan_id: subscription.plan_id,
      expires_at: subscription.expires_at,
      expires_at_type: typeof subscription.expires_at
    });
    
    const tabId = this.getTabIdFromPlanId(subscription.plan_id);
    
    if (tabId === 'basic') {
      return 'Ilimitada (por cantidad de pronósticos)';
    }
    
    if (subscription.expires_at) {
      const date = new Date(subscription.expires_at);
      console.log('🔍 [PROFILE] Convirtiendo fecha:', {
        originalValue: subscription.expires_at,
        convertedDate: date,
        isValidDate: !isNaN(date.getTime()),
        formattedDate: date.toLocaleDateString('es-ES')
      });
      return date.toLocaleDateString('es-ES');
    }
    
    console.log('⚠️ [PROFILE] expires_at está vacío o es falsy');
    return 'No disponible';
  }

  private passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
}
