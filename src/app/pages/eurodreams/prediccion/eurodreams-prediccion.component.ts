import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eurodreams-prediccion',
  templateUrl: './eurodreams-prediccion.component.html',
  styleUrls: ['./eurodreams-prediccion.component.css']
})
export class EurodreamsPrediccionComponent {
  loading = false;
  error: string | null = null;
  prediccion: any = null;

  constructor(private http: HttpClient) {}

  generarPrediccion() {
    this.loading = true;
    this.error = null;
    this.prediccion = null;

    this.http.post('/api/predictions/eurodreams', {})
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