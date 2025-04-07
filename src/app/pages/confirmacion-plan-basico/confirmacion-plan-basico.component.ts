import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirmacion-plan-basico',
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe],
  templateUrl: './confirmacion-plan-basico.component.html',
  styleUrl: './confirmacion-plan-basico.component.css'
})
export class ConfirmacionPlanBasicoComponent implements OnInit {
  currentDate: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    // Aquí se podría cargar información adicional del usuario o del plan
  }
}
