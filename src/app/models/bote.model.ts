export interface Bote {
  id: number;
  juego: string;
  cantidad: number;
  fecha: Date;
  imagen: string;
  descripcion?: string;
  activo: boolean;
  ultimaActualizacion: Date;
} 