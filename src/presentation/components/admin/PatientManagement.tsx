// IMPORTANTE: Este es un Server Component (no lleva 'use client')
import { getPatientsUseCase } from "@/application/use-cases/get-patients.use-case";
import { PatientClient } from "./PatientClient";

export async function PatientManagement() {
  // 1. Obtenemos los datos reales desde el caso de uso
  const patients = await getPatientsUseCase();

  // 2. Se los pasamos al componente de cliente que tiene los modales y filtros
  return (
    <div className="max-w-7xl mx-auto p-6">
      <PatientClient initialData={patients} />
    </div>
  );
}