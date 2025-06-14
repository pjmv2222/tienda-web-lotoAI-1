import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bote } from '../models/bote.model';

@Injectable({
  providedIn: 'root'
})
export class BotesService {
  private apiUrl = `${environment.apiUrl}/botes`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los botes activos
   */
  getBotes(): Observable<Bote[]> {
    return this.http.get<Bote[]>(this.apiUrl);
  }

  /**
   * Obtiene un bote específico por su ID
   */
  getBoteById(id: number): Observable<Bote> {
    return this.http.get<Bote>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene los botes por tipo de juego
   */
  getBotesByJuego(juego: string): Observable<Bote[]> {
    return this.http.get<Bote[]>(`${this.apiUrl}/juego/${juego}`);
  }
}
