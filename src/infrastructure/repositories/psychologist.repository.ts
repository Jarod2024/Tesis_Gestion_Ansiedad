import pool from "@/infrastructure/database/db";
import { Psychologist } from "@/domain/dtos/psychologist.dto";

export class PsychologistRepository {
  async getAll(): Promise<Psychologist[]> {
    const client = await pool.connect();
    try {
      // Consultamos solo a los que tienen rol PSICOLOGO
      // Si aún no tienes las columnas contacto/especialidad, las simulamos con strings
      const res = await client.query(`
        SELECT id, name, email 
        FROM users 
        WHERE role = 'PSICOLOGO'
      `);

      return res.rows.map(row => ({
        id: row.id,
        name: row.name,
        email: row.email,
        contacto: "0998112345", // Dato ejemplo hasta que agregues la columna
        especialidad: "Psicología Clínica", 
        pacientes: 0,
        estado: 'Activo'
      }));
    } finally {
      client.release();
    }
  }
}