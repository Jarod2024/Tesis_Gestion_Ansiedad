export interface Psychologist {
  id: string;
  name: string;
  email: string;
  contacto: string;
  especialidad: string;
  pacientes: number;
  estado: 'Activo' | 'Inactivo' | 'Pendiente';
}