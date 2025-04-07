import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './aviso-legal.component.html',
  styleUrl: './aviso-legal.component.css'
})
export class AvisoLegalComponent {
  // Podemos agregar lógica específica de la página aquí si es necesario
}
