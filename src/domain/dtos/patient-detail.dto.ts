// Interfaces para los datos reales de la BD
interface Appointment {
  fecha: string;
  hora: string;
  modalidad: string;
  motivo: string;
  estado: string;
}

interface MedicalRecord {
  fecha: string;
  nivelansiedad: number;
  notas: string;
}

interface TestResult {
  test: string;
  puntaje: number;
  interpretation: string;
}

interface PatientDetails {
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  testResults: TestResult[];
}