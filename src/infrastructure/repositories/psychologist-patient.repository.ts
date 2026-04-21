// src/infrastructure/repositories/psychologist-patient.repository.ts
import pool from "../database/db"; // Tu conexión directa a Postgres
import { PatientListItemDTO } from "@/domain/dtos/patient-management.dto";

export class PatientRepository {
  
  async getPatientsByPsychologist(psychologistId: number): Promise<PatientListItemDTO[]> {
    const query = `
      SELECT DISTINCT 
        u.id, 
        u.name as nombre, 
        u.email, 
        u.contacto as telefono,
        (
          SELECT MAX(appointment_date) 
          FROM appointments 
          WHERE patient_id = u.id AND psychologist_id = $1
        ) as ultima_cita
      FROM users u
      INNER JOIN appointments a ON u.id = a.patient_id
      WHERE a.psychologist_id = $1 
      AND u.role = 'PACIENTE'
      ORDER BY nombre ASC;
    `;

    try {
      const result = await pool.query(query, [psychologistId]);
      
      // Mapeamos los resultados de la base de datos al DTO
      return result.rows.map(row => ({
        id: row.id.toString(),
        nombre: row.nombre,
        email: row.email,
        telefono: row.telefono || "No registrado",
        // Formateamos la fecha si existe
        ultimaCita: row.ultima_cita 
          ? new Date(row.ultima_cita).toLocaleDateString('es-EC') 
          : "Sin citas registradas"
      }));
    } catch (error) {
      console.error("Error en getPatientsByPsychologist:", error);
      throw new Error("No se pudo obtener la lista de pacientes");
    }
  }
}