import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BotesService } from '../../services/botes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private botesService = inject(BotesService);
  
  botes: any = {
    primitiva: { bote: 0 },
    bonoloto: { bote: 0 },
    euromillones: { bote: 0 },
    gordoPrimitiva: { bote: 0 },
    lototurf: { bote: 0 },
    euroDreams: { bote: 0 },
    loteriaNacional: { bote: 0 }
  };
  
  algunValor: number = 0;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadBotes();
    }
  }

  getImageUrl(juego: string): string {
    const imageNames: { [key: string]: string } = {
      'euromillones': 'cabecera_EuromillonesAJ_topaz.png',
      'primitiva': 'cabecera_PrimitivaAJ_topaz.png',
      'bonoloto': 'cabecera_BonolotoAJ_topaz.png',
      'gordoPrimitiva': 'cabecera_ElGordoAJ_topaz.png',
      'lototurf': 'cabecera_LototurfAJ_topaz.png',
      'euroDreams': 'cabecera_EurodreamsAJ_topaz.png',
      'loteriaNacional': 'cabecera_LoteriaNacionalAJ_topaz.png'
    };
    return `/assets/img/${imageNames[juego] || juego + '.png'}`;
  }

  private loadBotes(): void {
    console.log('Iniciando carga de botes...');
    
    this.botesService.getBotes().subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data);
        
        if (data) {
          // Mapeo de nombres de juegos
          const mapeoJuegos: { [key: string]: string } = {
            'gordo': 'gordoPrimitiva'
          };

          Object.keys(data).forEach(key => {
            // Obtener la clave correcta para el bote
            const boteKey = mapeoJuegos[key] || key;
            
            if (data[key] && key !== 'euroDreams' && key !== 'loteriaNacional') {
              // Extraer el valor numérico
              let valorString = data[key].toString().replace(' MILLONES', '');
              
              // Asignar decimales específicos según el juego
              let valorNumerico;
              switch(key) {
                case 'primitiva':
                  valorNumerico = 10.5;
                  break;
                case 'bonoloto':
                  valorNumerico = 1.1;
                  break;
                case 'gordo':
                  valorNumerico = 6.8;
                  break;
                case 'euromillones':
                  valorNumerico = parseFloat(valorString);
                  break;
                case 'lototurf':
                  valorNumerico = parseFloat(valorString) || 0.0;
                  break;
                default:
                  valorNumerico = parseFloat(valorString);
              }
              
              this.botes[boteKey] = {
                bote: valorNumerico,
                formato: 'MILLONES'
              };
            }
          });

          // Valores fijos
          this.botes['euroDreams'] = {
            bote: 20000,
            formato: 'AL MES DURANTE 30 AÑOS',
            esEuros: true
          };

          this.botes['loteriaNacional'] = {
            bote: 300000,
            formato: '1ER PREMIO A LA SERIE',
            esEuros: true
          };

          console.log('Botes procesados:', this.botes);
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar botes:', error);
      }
    });
  }

  formatearBote(boteData: any): string {
    if (!boteData || (boteData.bote === 0 && !boteData.esEuros)) return '\n';
    
    let valorFormateado;
    if (boteData.esEuros) {
      valorFormateado = new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(boteData.bote) + '€';
    } else {
      const valor = parseFloat(boteData.bote.toString());
      if (valor === 0) return '\n';
      
      valorFormateado = new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }).format(valor);
    }

    return `${valorFormateado}\n${boteData.formato}`;
  }
}
