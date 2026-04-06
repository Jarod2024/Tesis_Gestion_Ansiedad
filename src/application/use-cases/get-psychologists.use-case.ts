import { PsychologistRepository } from "@/infrastructure/repositories/psychologist.repository";

export async function getPsychologistsUseCase() {
  const repository = new PsychologistRepository();
  return await repository.getAll();
}