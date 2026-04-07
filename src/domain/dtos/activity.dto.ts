export interface Activity {
  id: string | number;
  nombre: string;
  categoria: 'Respiración' | 'Visualizacion' | 'Sonidos' | 'Todos';
  duracion: string;
  usos: number;
  estado: 'Activo' | 'Inactivo';
}