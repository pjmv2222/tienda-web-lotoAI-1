import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-primitiva-prediccion',
  templateUrl: './primitiva-prediccion.component.html',
  styleUrls: ['./primitiva-prediccion.component.css']
})
export class PrimitivaPrediccionComponent {
  loading = false;
  error: string | null = null;
  prediccion: any = null;

  constructor(private http: HttpClient) {}

  generarPrediccion() {
    this.loading = true;
    this.error = null;
    this.prediccion = null;

    this.http.post('/api/predictions/primitiva', {})
      .subscribe({
        next: (data: any) => {
          this.prediccion = data.prediccion || data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al generar la predicción: ' + (err.error?.error || err.message);
          this.loading = false;
        }
      });
  }
} 