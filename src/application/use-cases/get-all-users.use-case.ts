import { UserRepository } from "@/infrastructure/repositories/user.repository";

export async function getAllUsersUseCase() {
  const repository = new UserRepository();
  return await repository.getAllForReports();
}