import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserPredictionService, PredictionHistoryResponse, PredictionHistoryItem } from '../../services/user-prediction.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-historial-predicciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './historial-predicciones.component.html',
  styleUrls: ['./historial-predicciones.component.css']
})
export class HistorialPrediccionesComponent implements OnInit {
  historialData: PredictionHistoryResponse | null = null;
  loading = true;
  error: string | null = null;
  selectedGame: string | null = null;
  gamesList: string[] = [];

  constructor(
    private userPredictionService: UserPredictionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadHistorial();
  }

  loadHistorial(): void {
    this.loading = true;
    this.error = null;

    this.userPredictionService.getPredictionHistory().subscribe({
      next: (response) => {
        if (response.success) {
          this.historialData = response.data;
          this.gamesList = Object.keys(this.historialData.predictionsByGame);
          if (this.gamesList.length > 0) {
            this.selectedGame = this.gamesList[0]; // Seleccionar el primer juego por defecto
          }
        } else {
          this.error = 'Error al cargar el historial de predicciones';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando historial:', error);
        this.error = 'Error al cargar el historial de predicciones';
        this.loading = false;
      }
    });
  }

  selectGame(gameType: string): void {
    this.selectedGame = gameType;
  }

  getSelectedGamePredictions(): PredictionHistoryItem[] {
    if (!this.historialData || !this.selectedGame) {
      return [];
    }
    return this.historialData.predictionsByGame[this.selectedGame] || [];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatPredictionData(predictionData: any): string {
    if (!predictionData) return '';
    
    let formatted = '';
    
    if (predictionData.numeros) {
      formatted += `Números: ${predictionData.numeros.join(', ')}`;
    }
    
    if (predictionData.estrellas) {
      formatted += ` | Estrellas: ${predictionData.estrellas.join(', ')}`;
    }
    
    if (predictionData.complementario) {
      formatted += ` | Complementario: ${predictionData.complementario}`;
    }
    
    if (predictionData.reintegro !== undefined) {
      formatted += ` | Reintegro: ${predictionData.reintegro}`;
    }
    
    if (predictionData.clave !== undefined) {
      formatted += ` | Clave: ${predictionData.clave}`;
    }
    
    if (predictionData.dream !== undefined) {
      formatted += ` | Dream: ${predictionData.dream}`;
    }
    
    if (predictionData.caballo !== undefined) {
      formatted += ` | Caballo: ${predictionData.caballo}`;
    }
    
    if (predictionData.numero) {
      formatted += `Número: ${predictionData.numero.join('')}`;
    }
    
    return formatted;
  }

  getGameDisplayName(gameType: string): string {
    if (!this.historialData) return gameType;
    return this.historialData.gameNames[gameType] || gameType;
  }

  trackByPredictionId(index: number, item: PredictionHistoryItem): number {
    return item.id;
  }
} 