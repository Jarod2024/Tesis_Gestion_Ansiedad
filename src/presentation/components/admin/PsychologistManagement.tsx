// IMPORTANTE: Este es un Server Component (no lleva 'use client')
import { getPsychologistsUseCase } from "@/application/use-cases/get-psychologists.use-case";
import { PsychologistClient } from "./PsychologistClient";

export async function PsychologistManagement() {
  // 1. Obtenemos los datos reales desde el caso de uso
  const psychologists = await getPsychologistsUseCase();

  // 2. Se los pasamos al componente de cliente que maneja los filtros
  return (
    <div className="max-w-7xl mx-auto p-6">
      <PsychologistClient initialData={psychologists} />
    </div>
  );
}