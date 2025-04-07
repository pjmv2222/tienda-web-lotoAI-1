import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirmacion-plan-mensual',
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe],
  templateUrl: './confirmacion-plan-mensual.component.html',
  styleUrl: './confirmacion-plan-mensual.component.css'
})
export class ConfirmacionPlanMensualComponent implements OnInit {
  currentDate: Date = new Date();
  nextBillingDate: Date;
  lastFourDigits: string = '4321'; // Simulación de los últimos 4 dígitos de la tarjeta

  constructor() {
    // Calcular la fecha de la próxima facturación (un mes después de la fecha actual)
    this.nextBillingDate = new Date(this.currentDate);
    this.nextBillingDate.setMonth(this.nextBillingDate.getMonth() + 1);
  }

  ngOnInit(): void {
    // Aquí se podría cargar información adicional del usuario o del plan
  }

  downloadInvoice(): void {
    // Lógica para descargar la factura
    console.log('Descargando factura...');
  }

  cancelSubscription(): void {
    // Lógica para cancelar la suscripción
    console.log('Cancelando suscripción...');
    // Aquí se implementaría la lógica para mostrar un modal de confirmación
  }
}
