import { AdminRepository } from "@/infrastructure/repositories/admin.repository";

export async function getAdminDashboardUseCase() {
  const repository = new AdminRepository();
  return await repository.getDashboardData();
}