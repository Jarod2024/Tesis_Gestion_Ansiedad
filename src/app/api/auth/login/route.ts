import { NextResponse } from "next/server";
import { LoginUserUseCase } from "@/application/use-cases/auth/login-user.use-case";
import { PgUserRepository } from "@/infrastructure/repositories/pg-user.repository";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    const repository = new PgUserRepository();
    const useCase = new LoginUserUseCase(repository);

    const user = await useCase.execute(email, password);

    // En una fase posterior, aquí generarás el JWT (RQF-001)
    return NextResponse.json(user);
  } catch (error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ error: String(error) }, { status: 400 });
}
}