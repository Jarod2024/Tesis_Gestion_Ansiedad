import { IAuthRepository } from "@/domain/repositories/auth.repository";
import bcrypt from "bcrypt";

export class LoginUserUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(email: string, passwordPlan: string) {
    const user = await this.authRepository.findByEmail(email);
    
    if (!user) throw new Error("Credenciales inválidas");

    // Comparación segura con el hash de la base de datos (PostgreSQL)
    const isPasswordValid = await bcrypt.compare(passwordPlan, user.password!);
    if (!isPasswordValid) throw new Error("Credenciales inválidas");

    // Retornamos el rol para la redirección
    return { 
      id: user.id,
      role: user.role, // PACIENTE, PSICOLOGO o ADMINISTRADOR
      name: user.name 
    };
  }
}