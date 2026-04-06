export interface AdminDashboardData {
  stats: {
    usuarios: number;
    psicologos: number;
    estudiantes: number;
    citas: number;
  };
  recentUsers: {
    name: string;
    role: string;
    date: string; // Asegúrate que sea 'string' y no 'Date'
  }[];
}