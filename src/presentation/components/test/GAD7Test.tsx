'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const QUESTIONS = [
  '¿Se ha sentido nervioso/a, ansioso/a o con los nervios de punta?',
  '¿No ha sido capaz de parar o controlar su preocupación?',
  '¿Se ha preocupado demasiado por diferentes cosas?',
  '¿Ha tenido dificultad para relajarse?',
  '¿Se ha sentido tan inquieto/a que no ha podido quedarse quieto/a?',
  '¿Se ha sentido fácilmente irritable o molesto/a?',
  '¿Ha sentido miedo como si fuera a suceder algo terrible?',
];

const OPTIONS = [
  { value: 0, label: 'Nunca' },
  { value: 1, label: 'Varios días' },
  { value: 2, label: 'Más de la mitad de los días' },
  { value: 3, label: 'Todos los días' },
];

function getSeverity(score: number) {
  if (score <= 4) return { level: 'Mínima', recommendation: 'Sugerir seguimiento preventivo.' };
  if (score <= 9) return { level: 'Leve', recommendation: 'Sugerir ejercicios de relajación y psicoeducación.' };
  if (score <= 14) return { level: 'Moderada', recommendation: 'Punto de corte donde se recomienda evaluación clínica profesional.' };
  return { level: 'Severa', recommendation: 'Requiere intervención inmediata por especialistas.' };
}

export function GAD7Test({ onHomeClick }: { onHomeClick: () => void }) {
  const [responses, setResponses] = useState<number[]>(Array(7).fill(-1));
  const [result, setResult] = useState<{ score: number; severity: { level: string; recommendation: string } } | null>(null);
  const router = useRouter();

  const handleResponseChange = (questionIndex: number, value: number) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = value;
    setResponses(newResponses);
  };

  const calculateResult = () => {
    if (responses.includes(-1)) {
      alert('Por favor, responde todas las preguntas.');
      return;
    }
    const score = responses.reduce((sum, val) => sum + val, 0);
    const severity = getSeverity(score);
    setResult({ score, severity });
  };

  const resetTest = () => {
    setResponses(Array(7).fill(-1));
    setResult(null);
  };

  return (
    <div className="space-y-6 pt-12">
      {/* Botón Volver */}
      <button
        onClick={onHomeClick}
        className="flex items-center gap-2 px-4 py-2 bg-white text-[#1E4D8C] font-bold rounded-lg hover:bg-[#71A5D9] hover:text-white transition shadow-lg border-2 border-[#71A5D9]"
      >
        <ArrowLeft size={20} />
        Volver al Inicio
      </button>

      <div className="bg-white rounded-2xl border-4 border-[#71A5D9] p-8 shadow-xl">
      {!result ? (
        <>
          <h1 className="text-4xl font-black text-[#1E4D8C] mb-6 text-center">
            Test de Autoevaluación GAD-7
          </h1>
          <p className="text-slate-700 text-lg mb-4 text-center">
            Responde las siguientes preguntas basándote en cómo te has sentido durante las últimas 2 semanas.
          </p>
          <p className="text-slate-600 text-sm mb-8 text-center italic">
            Los resultados se calculan de forma confidencial en tu navegador y no se almacenan ni comparten.
          </p>
          <div className="space-y-8">
            {QUESTIONS.map((question, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-[#1E4D8C] mb-4">
                  {index + 1}. {question}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {OPTIONS.map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option.value}
                        checked={responses[index] === option.value}
                        onChange={() => handleResponseChange(index, option.value)}
                        className="w-4 h-4 text-[#71A5D9] focus:ring-[#1E4D8C]"
                      />
                      <span className="text-slate-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={calculateResult}
              className="py-3 px-8 bg-[#71A5D9] text-white font-bold text-lg rounded-lg hover:bg-[#1E4D8C] transition shadow-lg"
            >
              Calcular Resultado
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-black text-[#1E4D8C] mb-4">Resultado</h2>
          <p className="text-2xl text-slate-700 mb-4">
            Puntaje Total: <span className="font-bold">{result.score}</span> / 21
          </p>
          <p className="text-xl text-slate-700 mb-4">
            Nivel de Ansiedad: <span className="font-bold text-[#1E4D8C]">{result.severity.level}</span>
          </p>
          <p className="text-lg text-slate-700 mb-4">
            {result.severity.recommendation}
          </p>
          <p className="text-slate-600 text-sm mb-6 italic">
            Este resultado es confidencial y solo se muestra en tu navegador. Si necesitas apoyo profesional, considera registrarte para acceder a recursos adicionales.
          </p>
          <button
            onClick={onHomeClick}
            className="py-3 px-8 bg-[#71A5D9] text-white font-bold text-lg rounded-lg hover:bg-[#1E4D8C] transition shadow-lg"
          >
            Volver al Inicio
          </button>
        </div>
      )}
    </div>
    </div>
  );
}