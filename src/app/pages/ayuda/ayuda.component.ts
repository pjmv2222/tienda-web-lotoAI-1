import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {
  // Podemos agregar lógica específica de la página aquí si es necesario
}
