import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bonoloto',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './bonoloto.component.html',
  styleUrl: './bonoloto.component.css'
})
export class BonolotoComponent implements OnInit {
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
