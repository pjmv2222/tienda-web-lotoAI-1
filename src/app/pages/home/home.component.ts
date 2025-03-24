import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  hasSubscriptions: boolean = false;
  private authSubscription: Subscription | null = null;
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    // Verificar si el servicio de autenticación está disponible
    if (this.authService && this.authService.currentUser) {
      // Suscribirse al usuario actual
      this.authSubscription = this.authService.currentUser.subscribe({
        next: (user) => {
          this.currentUser = user;
          
          // Verificar si el usuario existe y tiene suscripciones de forma segura
          this.hasSubscriptions = !!this.currentUser?.subscriptions?.length;
          
          if (this.currentUser?.subscriptions) {
            console.log('Suscripciones del usuario:', this.currentUser.subscriptions);
          } else {
            console.log('El usuario no tiene suscripciones activas');
          }
        },
        error: (error) => {
          console.error('Error al obtener el usuario actual:', error);
        }
      });
    } else {
      console.warn('El servicio de autenticación no está disponible');
    }
  }
  
  ngOnDestroy(): void {
    // Cancelar la suscripción para evitar memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
