import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LotteryBall3dNewComponent } from '../../components/lottery-ball-3d-new/lottery-ball-3d-new.component';

@Component({
  selector: 'app-euromillon',
  standalone: true,
  imports: [RouterLink, CommonModule, LotteryBall3dNewComponent],
  templateUrl: './euromillon.component.html',
  styleUrl: './euromillon.component.css'
})
export class EuromillonComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aquí se podría verificar si el usuario está autenticado
    // Por ahora, lo dejamos en false para mostrar los mensajes de inicio de sesión requerido
    this.isLoggedIn = false;
  }

  generateBasicPrediction(): void {
    // Lógica para generar una predicción básica
    console.log('Generando predicción básica...');
    // Aquí se implementaría la lógica para llamar al servicio de predicciones
  }

  showSubscriptionOptions(): void {
    // Lógica para mostrar las opciones de suscripción
    console.log('Mostrando opciones de suscripción...');
    // Navegar a la página de planes de suscripción
    this.router.navigate(['/planes']);
  }
}
