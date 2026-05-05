// src/infrastructure/actions/anxiety.actions.ts
"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/infrastructure/auth/auth.options";
import { PgPatientRepository } from "../repositories/PgPatientRepository";

const patientRepo = new PgPatientRepository();

export async function saveGAD7ResultAction(score: number, interpretation: string, responses: number[]) {
  const session = await getServerSession(authOptions);

  // Solo procedemos si hay sesión y el rol es PACIENTE
  if (!session || session.user.role !== "PACIENTE") {
    return { success: false, message: "Usuario no autenticado para guardar" };
  }

  try {
    const patientId = Number(session.user.id);
    
    // Mapeo de 0-21 (GAD-7) a 1-10 (Tu DB)
    const normalizedLevel = Math.round((score / 21) * 9) + 1;

    // 1. Guardar en FICHA MÉDICA (anxiety_tracking)
    await patientRepo.saveAnxietyRecord(
      patientId,
      normalizedLevel,
      `Resultado GAD-7: ${interpretation} (Score: ${score})`
    );

    // 2. Guardar en RESULTADOS TEST (gad7_responses) - ¡Esto hace que el contador suba!
    await patientRepo.saveGad7Response(
      patientId,
      score,
      interpretation,
      responses
      
    );

    return { success: true };
  } catch (error) {
    console.error("Error al guardar test:", error);
    return { success: false, error: "Error de base de datos" };
  }
}