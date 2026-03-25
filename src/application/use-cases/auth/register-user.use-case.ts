import { IAuthRepository } from "@/domain/repositories/auth.repository";
import { User } from "@/domain/entities/user";
import bcrypt from "bcrypt";

export class RegisterUserUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(userData: User) {
    // 1. Validar dominio institucional (ESPE)
    if (!userData.email.endsWith("@espe.edu.ec")) {
      throw new Error("Solo se permiten correos institucionales @espe.edu.ec");
    }

    // 2. Verificar si el usuario ya existe
    const existingUser = await this.authRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("El correo ya está registrado");
    }

    // 3. Cifrar la contraseña (Seguridad RQF-001)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password!, salt);

    // 4. Guardar en la base de datos
    const newUser: User = {
      ...userData,
      password: hashedPassword,
    };

    await this.authRepository.save(newUser);
    return { message: "Usuario registrado con éxito" };
  }
}