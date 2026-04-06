import { PatientRepository } from "@/infrastructure/repositories/patient.repository";

export async function getPatientsUseCase() {
  const repository = new PatientRepository();
  return await repository.getAll();
}