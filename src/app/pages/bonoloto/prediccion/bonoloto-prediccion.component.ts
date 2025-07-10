import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bonoloto-prediccion',
  templateUrl: './bonoloto-prediccion.component.html',
  styleUrls: ['./bonoloto-prediccion.component.css']
})
export class BonolotoPrediccionComponent {
  loading = false;
  error: string | null = null;
  prediccion: any = null;

  constructor(private http: HttpClient) {}

  generarPrediccion() {
    this.loading = true;
    this.error = null;
    this.prediccion = null;

    this.http.post('/api/predictions/bonoloto', {})
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