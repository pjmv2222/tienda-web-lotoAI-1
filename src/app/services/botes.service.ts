import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Botes {
  primitiva: string;
  bonoloto: string;
  euromillones: string;
  gordo: string;
  lototurf: string;
  eurodreams: string;
  loterianacional: string;
}

@Injectable({
  providedIn: 'root'
})
export class BotesService {
  constructor(private http: HttpClient) { }

  getBotes(): Observable<Botes> {
    const timestamp = new Date().getTime();
    return this.http.get<any>(`./assets/botes.json?t=${timestamp}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }).pipe(
      map(data => ({
        primitiva: data.primitiva || '0',
        bonoloto: data.bonoloto || '0',
        euromillones: data.euromillones || '0',
        gordo: data.gordo || '0',
        lototurf: data.lototurf || '0',
        eurodreams: data.eurodreams || '20.000€',
        loterianacional: data.loterianacional || '300.000€'
      }))
    );
  }
}
