import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-cookies',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gestion-cookies.component.html',
  styleUrl: './gestion-cookies.component.css'
})
export class GestionCookiesComponent {
  // Podemos agregar lógica específica de la página aquí si es necesario
}
