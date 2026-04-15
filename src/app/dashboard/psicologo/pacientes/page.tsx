// src/app/dashboard/psicologo/pacientes/page.tsx
import { PatientManager } from "@/presentation/components/psychologist/patients/PatientManager";

export default function PacientesPsicologoPage() {
  // Datos temporales (Mock) mientras conectamos la base de datos
  const mockPatients = [
    { 
      id: "1", 
      nombre: "Bertha Lourdes Tipan Lopez", 
      email: "berthout@hotmail.com", 
      telefono: "0987654321", 
      ultimaCita: "03/05/2026" 
    },
    { 
      id: "2", 
      nombre: "Roberto Lucas Morales Sanchez", 
      email: "roberto@mail.com", 
      telefono: "0912345678", 
      ultimaCita: "04/06/2026" 
    }
  ];

  return <PatientManager patients={mockPatients} />;
}