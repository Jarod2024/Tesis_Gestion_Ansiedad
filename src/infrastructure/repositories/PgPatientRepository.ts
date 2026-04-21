// src/infrastructure/repositories/PgPatientRepository.ts
import pool from "../database/db";

export class PgPatientRepository {
  async getPatientFullDetails(patientId: string) {
    // 1. Historial de Citas (Tabla: appointments)
    const appointmentsQuery = `
      SELECT 
        appointment_date as fecha, 
        appointment_time as hora, 
        modality as modalidad, 
        reason as motivo, 
        status as estado 
      FROM appointments 
      WHERE patient_id = $1 
      ORDER BY appointment_date DESC`;

    // 2. Ficha Médica (Tabla: anxiety_tracking)
    const medicalQuery = `
      SELECT 
        date as fecha, 
        anxiety_level as nivelansiedad, 
        notes as notas 
      FROM anxiety_tracking 
      WHERE patient_id = $1 
      ORDER BY date DESC`;

    // 3. Resultados de Test (Tabla: sus_responses)
    // Nota: He adaptado esta query para que use la tabla 'sus_responses' que nos pasaste
    const testsQuery = `
      SELECT 
        'System Usability Scale (SUS)' as test, 
        sus_score as puntaje, 
        interpretation as interpretation 
      FROM sus_responses 
      WHERE user_id = $1 
      ORDER BY created_at DESC`;

    const [appRes, medicalRes, testsRes] = await Promise.all([
      pool.query(appointmentsQuery, [patientId]),
      pool.query(medicalQuery, [patientId]),
      pool.query(testsQuery, [patientId]) // <--- CORREGIDO: Ejecutar directamente
    ]);

    return {
      appointments: appRes.rows,
      medicalRecords: medicalRes.rows,
      testResults: testsRes.rows
    };
  }
}