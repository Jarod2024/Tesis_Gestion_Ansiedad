import { IPsychologistRepository, PsychologistDashboardDTO } from "@/domain/dtos/psychologist-dashboard.dto";

export class GetPsychologistDashboard {
  // Recibimos la interfaz (abstracción), no la implementación de la DB
  constructor(private repository: IPsychologistRepository) {}

  async execute(psychologistId: string): Promise<PsychologistDashboardDTO> {
    // Aquí podrías agregar lógica extra si fuera necesario
    // Por ejemplo: validar si el psicólogo está activo antes de traer sus datos
    
    return await this.repository.getDashboardData(psychologistId);
  }
}