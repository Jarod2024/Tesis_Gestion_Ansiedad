import pool from "../database/db";
import { IAuthRepository } from "@/domain/repositories/auth.repository";
import { User } from "@/domain/entities/user";

export class PgUserRepository implements IAuthRepository {
  async save(user: User): Promise<void> {
    const query = `
      INSERT INTO users (email, password, name, role) 
      VALUES ($1, $2, $3, $4)
    `;
    // Usamos el password ya cifrado que viene del Caso de Uso
    const values = [user.email, user.password, user.name, user.role];

    await pool.query(query, values);
  }

  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0] || null;
  }
}