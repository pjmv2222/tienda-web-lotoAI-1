import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BotesService } from '../../services/botes.service';
import { Bote } from '../../models/bote.model';

@Component({
  selector: 'app-botes',
  templateUrl: './botes.component.html',
  styleUrls: ['./botes.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BotesComponent implements OnInit {
  botes: Bote[] = [];
  botesFiltrados: Bote[] = [];
  loading = false;
  error: string | null = null;
  filtroActivo = 'todos';

  constructor(private botesService: BotesService) { }

  ngOnInit(): void {
    this.cargarBotes();
  }

  cargarBotes(): void {
    this.loading = true;
    this.error = null;

    this.botesService.getBotes().subscribe({
      next: (botes) => {
        this.botes = botes;
        this.filtrarBotes(this.filtroActivo);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar los botes:', error);
        this.error = 'No se pudieron cargar los botes. Por favor, inténtalo de nuevo.';
        this.loading = false;
      }
    });
  }

  filtrarBotes(filtro: string): void {
    this.filtroActivo = filtro;
    
    if (filtro === 'todos') {
      this.botesFiltrados = this.botes;
    } else {
      this.botesFiltrados = this.botes.filter(bote => 
        bote.juego.toLowerCase() === filtro.toLowerCase()
      );
    }
  }

  formatearCantidad(cantidad: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(cantidad);
  }

  formatearFecha(fecha: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(fecha));
  }
} 