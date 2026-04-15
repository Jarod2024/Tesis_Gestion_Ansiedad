import { Brain, Heart, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { InfoCard } from './InfoCard';

const INFO_CARDS = [
  {
    icon: <Brain size={56} />,
    title: 'Ansiedad',
    description: 'Entiende qué es la ansiedad, identifica sus síntomas y aprende estrategias inmediatas para manejarla en tu día a día.',
    buttonText: 'Más Información →',
  },
  {
    icon: <Heart size={56} />,
    title: 'Salud Mental',
    description: 'Reconoce signos de alerta, accede a recursos de apoyo y aprende cuándo buscar ayuda de un profesional de salud mental.',
    buttonText: 'Más Información →',
  },
  {
    icon: <FileText size={56} />,
    title: 'Análisis Personal',
    description: 'Realiza el cuestionario GAD-7 de 7 preguntas para conocer tu nivel de ansiedad y recibir recomendaciones personalizadas.',
    buttonText: 'Realizar Test →',
  },
];

export function InformateSection() {
  const router = useRouter();

  return (
    <section id="info" className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-black text-[#1E4D8C] mb-2">Infórmate</h2>
        <div className="h-1 w-32 bg-[#71A5D9] rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {INFO_CARDS.map((card, index) => (
          <InfoCard 
            key={index} 
            {...card} 
            onButtonClick={index === 2 ? () => router.push('/test') : undefined}
          />
        ))}
      </div>
    </section>
  );
}
