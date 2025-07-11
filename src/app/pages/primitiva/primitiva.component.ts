import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';
import { Subscription } from 'rxjs';
import { EuromillonesBallComponent } from '../../components/euromillones-ball/euromillones-ball.component';
import { HttpClient } from '@angular/common/http';
import { LotteryBaseComponent } from '../../shared/lottery-base.component';
import { PredictionService } from '../../services/prediction.service';

@Component({
  selector: 'app-primitiva',
  standalone: true,
  imports: [RouterLink, CommonModule, EuromillonesBallComponent],
  templateUrl: './primitiva.component.html',
  styleUrl: './primitiva.component.css'
})
export class PrimitivaComponent extends LotteryBaseComponent implements OnInit, OnDestroy {
  protected override gameId: string = 'primitiva';

  isLoggedIn = false;
  hasBasicPlan = false;
  hasMonthlyPlan = false;
  hasProPlan = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    http: HttpClient,
    predictionService: PredictionService
  ) {
    super(http, predictionService);
  }

  override ngOnInit(): void {
    super.ngOnInit(); // Llama al método de la clase base para cargar la información del bote

    // Verificar si el usuario está autenticado
    this.isLoggedIn = !!this.authService.currentUserValue;

    // Verificar si el usuario tiene suscripciones activas
    if (this.isLoggedIn) {
      // Verificar plan básico
      const basicSub = this.subscriptionService.hasActivePlan('basic').subscribe(hasBasic => {
        this.hasBasicPlan = hasBasic;
        console.log('Usuario tiene plan básico:', this.hasBasicPlan);
      });
      this.subscriptions.push(basicSub);

      // Verificar plan mensual
      const monthlySub = this.subscriptionService.hasActivePlan('monthly').subscribe(hasMonthly => {
        this.hasMonthlyPlan = hasMonthly;
        console.log('Usuario tiene plan mensual:', this.hasMonthlyPlan);
      });
      this.subscriptions.push(monthlySub);

      // Verificar plan pro
      const proSub = this.subscriptionService.hasActivePlan('pro').subscribe(hasPro => {
        this.hasProPlan = hasPro;
        console.log('Usuario tiene plan pro:', this.hasProPlan);
      });
      this.subscriptions.push(proSub);
    } else {
      // El usuario no está autenticado, no tiene ningún plan
      this.hasBasicPlan = false;
      this.hasMonthlyPlan = false;
      this.hasProPlan = false;
      console.log('Usuario no autenticado, no tiene planes activos');
    }
  }

  showSubscriptionOptions(): void {
    // Lógica para mostrar las opciones de suscripción
    console.log('Mostrando opciones de suscripción...');
    // Navegar a la página de planes de suscripción
    this.router.navigate(['/planes']);
  }

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones para evitar memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
