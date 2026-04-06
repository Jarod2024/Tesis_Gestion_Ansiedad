import { IAuthRepository } from "@/domain/repositories/auth.repository";

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(email: string, passwordPlan: string) {
    const user = await this.authRepository.findByEmail(email);
    
    if (!user) throw new Error("Credenciales inválidas");

    // NOTA: Aquí compararemos el password cifrado más adelante con bcrypt
    if (user.password !== passwordPlan) throw new Error("Contraseña incorrecta");

    return { id: user.id, email: user.email, role: user.role };
  }
}