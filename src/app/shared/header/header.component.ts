import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private http = inject(HttpClient);
  
  botes: { [key: string]: string } = {};
  loading = true;
  juegos = ['euromillones', 'primitiva', 'bonoloto', 'gordo', 'lototurf', 'eurodreams', 'loterianacional'];

  ngOnInit() {
    this.cargarBotes();
  }

  async cargarBotes() {
    try {
      const timestamp = new Date().getTime();
      const response = await this.http.get<{ [key: string]: string }>(`assets/botes.json?t=${timestamp}`).toPromise();
      
      if (response) {
        Object.keys(response).forEach(key => {
          if (response[key] && response[key] !== '0') {
            if (!response[key].includes('MILLONES') && !response[key].includes('€')) {
              this.botes[key] = `${response[key]} MILLONES`;
            } else {
              this.botes[key] = response[key];
            }
          }
        });
      }
    } catch (error) {
      console.error('Error cargando botes:', error);
    } finally {
      this.loading = false;
    }
  }

  getImageUrl(juego: string): string {
    const imageMap: { [key: string]: string } = {
      'euromillones': 'cabecera_EuromillonesAJ_topaz',
      'primitiva': 'cabecera_PrimitivaAJ_topaz',
      'bonoloto': 'cabecera_BonolotoAJ_topaz',
      'gordo': 'cabecera_ElGordoAJ_topaz',
      'lototurf': 'cabecera_LototurfAJ_topaz',
      'eurodreams': 'cabecera_EurodreamsAJ_topaz',
      'loterianacional': 'cabecera_LoteriaNacionalAJ_topaz'
    };

    const imageName = imageMap[juego.toLowerCase()] || juego;
    return `assets/img/${imageName}.png`;
  }

  getBoteDisplay(juego: string): string {
    return this.botes[juego] || 'Cargando...';
  }
}
