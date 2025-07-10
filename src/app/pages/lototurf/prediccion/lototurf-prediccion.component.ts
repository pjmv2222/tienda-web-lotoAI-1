import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-lototurf-prediccion',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './lototurf-prediccion.component.html',
  styleUrls: ['./lototurf-prediccion.component.css']
})
export class LototurfPrediccionComponent {
  loading = false;
  error: string | null = null;
  prediccion: any = null;

  constructor(private http: HttpClient) {}

  generarPrediccion() {
    this.loading = true;
    this.error = null;
    this.prediccion = null;

    this.http.post('/api/predictions/lototurf', {})
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