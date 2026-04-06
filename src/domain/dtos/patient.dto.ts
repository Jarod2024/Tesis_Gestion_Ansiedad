export interface Patient {
  id: string;
  name: string;
  email: string;
  contacto: string;
  fecha_registro: string;
  estado: 'Activo' | 'Inactivo' | 'Pendiente';
}