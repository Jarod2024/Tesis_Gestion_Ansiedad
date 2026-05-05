// src/infrastructure/repositories/PgPatientRepository.ts
import pool from "../database/db";

export class PgPatientRepository {
  async getPatientFullDetails(patientId: string) {
    // 1. Historial de Citas
    const appointmentsQuery = `
      SELECT 
        appointment_date as fecha, 
        appointment_time as hora, 
        modality as modality, 
        reason as motivo, 
        status as estado 
      FROM appointments 
      WHERE patient_id = $1 
      ORDER BY appointment_date DESC`;

    // 2. Ficha Médica
    const medicalQuery = `
      SELECT 
        date as fecha, 
        anxiety_level as nivelansiedad, 
        notes as notas 
      FROM anxiety_tracking 
      WHERE patient_id = $1 
      ORDER BY date DESC`;

    // 3. Resultados de Test (UNION ALL corregido)
    const testsQuery = `
      SELECT 
        'Test SUS (Usabilidad)' as test,
        created_at as fecha, 
        sus_score as puntaje, 
        interpretation,
        NULL as responses -- <--- CAMBIADO A PLURAL Y NULL NORMAL
      FROM sus_responses 
      WHERE user_id = $1 
      
      UNION ALL 
      
      SELECT 
        'Test GAD-7 (Ansiedad)' as test,
        created_at as fecha, 
        score as puntaje, 
        interpretation,
        responses -- <--- CAMBIADO A PLURAL
      FROM gad7_responses 
      WHERE patient_id = $1 
      
      ORDER BY fecha DESC`;

    const [appRes, medicalRes, testsRes] = await Promise.all([
      pool.query(appointmentsQuery, [patientId]),
      pool.query(medicalQuery, [patientId]),
      pool.query(testsQuery, [patientId])
    ]);

    return {
      appointments: appRes.rows,
      medicalRecords: medicalRes.rows,
      testResults: testsRes.rows
    };
  }

  // Método para guardar test GAD-7 CORREGIDO
  async saveGad7Response(patientId: number, score: number, interpretation: string, responses: number[]) {
    const query = `
      INSERT INTO gad7_responses (patient_id, score, interpretation, responses)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
      
    // Asegúrate de enviar el array como string JSON para Postgres
    const res = await pool.query(query, [patientId, score, interpretation, JSON.stringify(responses)]);
    return res.rows[0];
  }

  async saveAnxietyRecord(patientId: number, level: number, notes: string) {
    const query = `
      INSERT INTO anxiety_tracking (patient_id, anxiety_level, date, notes)
      VALUES ($1, $2, CURRENT_DATE, $3)
      RETURNING *`;
    const res = await pool.query(query, [patientId, level, notes]);
    return res.rows[0];
  }
}