export interface User {
  id?: string;
  email: string;
  password?: string;
  name: string;
  role: 'PACIENTE' | 'PSICOLOGO' | 'ADMINISTRADOR';
}