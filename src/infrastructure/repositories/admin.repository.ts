import pool from "@/infrastructure/database/db";
import { AdminDashboardData } from "@/domain/dtos/admin-dashboard.dto";

// 1. Definimos una interfaz interna para representar la fila de la DB
interface UserRow {
  name: string;
  role: string;
}

export class AdminRepository {
  async getDashboardData(): Promise<AdminDashboardData> {
    const client = await pool.connect();
    try {
      // Consultas de conteo
      const totalRes = await client.query("SELECT COUNT(*) FROM users");
      const psicologosRes = await client.query("SELECT COUNT(*) FROM users WHERE role = 'PSICOLOGO'");
      const estudiantesRes = await client.query("SELECT COUNT(*) FROM users WHERE role = 'PACIENTE'");

      // 2. Tipamos la consulta de usuarios recientes <UserRow>
      const recentRes = await client.query<UserRow>(
        "SELECT name, role FROM users LIMIT 5"
      );

      return {
        stats: {
          usuarios: parseInt(totalRes.rows[0].count),
          psicologos: parseInt(psicologosRes.rows[0].count),
          estudiantes: parseInt(estudiantesRes.rows[0].count),
          citas: 0,
        },
        // Ahora TS sabe que 'row' tiene 'name' y 'role' como strings
        recentUsers: recentRes.rows.map(row => ({
          name: row.name,
          role: row.role,
          date: "31/03/26" 
        }))
      };
    } finally {
      client.release();
    }
  }
}