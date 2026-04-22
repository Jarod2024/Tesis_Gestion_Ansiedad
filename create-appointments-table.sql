-- ============================================
-- MINDPEACE - SCRIPT COMPLETO BASE DE DATOS
-- Gestión de Ansiedad en Estudiantes Universitarios
-- ============================================

-- 1️⃣ TABLA: USUARIOS (Pacientes, Psicólogos, Admin)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('PACIENTE', 'PSICOLOGO', 'ADMINISTRADOR')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);


-- 2️⃣ TABLA: CITAS (Appointments)
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

CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_psychologist_id ON appointments(psychologist_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);


-- 3️⃣ TABLA: RESPUESTAS SUS (System Usability Scale)
CREATE TABLE IF NOT EXISTS sus_responses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  q1 INTEGER NOT NULL CHECK (q1 BETWEEN 1 AND 5),
  q2 INTEGER NOT NULL CHECK (q2 BETWEEN 1 AND 5),
  q3 INTEGER NOT NULL CHECK (q3 BETWEEN 1 AND 5),
  q4 INTEGER NOT NULL CHECK (q4 BETWEEN 1 AND 5),
  q5 INTEGER NOT NULL CHECK (q5 BETWEEN 1 AND 5),
  q6 INTEGER NOT NULL CHECK (q6 BETWEEN 1 AND 5),
  q7 INTEGER NOT NULL CHECK (q7 BETWEEN 1 AND 5),
  q8 INTEGER NOT NULL CHECK (q8 BETWEEN 1 AND 5),
  q9 INTEGER NOT NULL CHECK (q9 BETWEEN 1 AND 5),
  q10 INTEGER NOT NULL CHECK (q10 BETWEEN 1 AND 5),
  sus_score DECIMAL(5, 2) NOT NULL,
  interpretation VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sus_responses_user_id ON sus_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_sus_responses_score ON sus_responses(sus_score);


-- 4️⃣ TABLA: NOTAS DE CITAS (Notas del psicólogo después de la cita)
CREATE TABLE IF NOT EXISTS appointment_notes (
  id SERIAL PRIMARY KEY,
  appointment_id INTEGER NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  psychologist_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notes TEXT,
  recommendations TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_appointment_notes_appointment_id ON appointment_notes(appointment_id);


-- 5️⃣ TABLA: DISPONIBILIDAD PSICÓLOGO (Horarios disponibles)
CREATE TABLE IF NOT EXISTS psychologist_availability (
  id SERIAL PRIMARY KEY,
  psychologist_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time VARCHAR(5) NOT NULL,
  end_time VARCHAR(5) NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_availability_psychologist ON psychologist_availability(psychologist_id);


-- 6️⃣ TABLA: FEEDBACK DE PACIENTE (Calificación de citas)
CREATE TABLE IF NOT EXISTS appointment_feedback (
  id SERIAL PRIMARY KEY,
  appointment_id INTEGER NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  patient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comments TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feedback_appointment ON appointment_feedback(appointment_id);
CREATE INDEX IF NOT EXISTS idx_feedback_patient ON appointment_feedback(patient_id);


-- 7️⃣ TABLA: HISTORIAL DE ANSIEDAD (Seguimiento de niveles)
CREATE TABLE IF NOT EXISTS anxiety_tracking (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  anxiety_level INTEGER NOT NULL CHECK (anxiety_level BETWEEN 1 AND 10),
  date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_anxiety_patient ON anxiety_tracking(patient_id);
CREATE INDEX IF NOT EXISTS idx_anxiety_date ON anxiety_tracking(date);

ON CONFLICT DO NOTHING;

-- ============================================
-- FIN DEL SCRIPT
-- ============================================