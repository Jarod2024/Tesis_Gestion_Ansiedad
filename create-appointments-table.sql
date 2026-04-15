-- Script para crear la tabla de appointments (citas)
-- Ejecutar en pgAdmin o con: psql -d tu_base_datos < create-appointments-table.sql

CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  psychologist_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(5) NOT NULL,
  modality VARCHAR(50) NOT NULL CHECK (modality IN ('Presencial', 'Virtual')),
  reason TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'Pendiente' CHECK (status IN ('Pendiente', 'Aceptada', 'Rechazada', 'Cancelada')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(psychologist_id, appointment_date, appointment_time)
);

-- Crear índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_psychologist_id ON appointments(psychologist_id);
CREATE INDEX IF NOT EXISTS idx_appointments_appointment_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
