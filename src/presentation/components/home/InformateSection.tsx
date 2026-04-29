import { Brain, Heart, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { InfoCard } from './InfoCard';

const INFO_CARDS = [
  {
    icon: <Brain size={56} />,
    title: 'Ansiedad',
    description: 'Entiende qué es la ansiedad, identifica sus síntomas y aprende estrategias inmediatas para manejarla en tu día a día.',
    buttonText: 'Más información →',
  },
  {
    icon: <Heart size={56} />,
    title: 'Salud mental',
    description: 'Reconoce signos de alerta, accede a recursos de apoyo y aprende cuándo buscar ayuda de un profesional de salud mental.',
    buttonText: 'Más información →',
  },
  {
    icon: <FileText size={56} />,
    title: 'Análisis personal',
    description: 'Completa el cuestionario GAD-7 para conocer tu nivel de ansiedad y obtener información valiosa sobre tu salud mental con recomendaciones personalizadas.',
    buttonText: 'Realizar test →',
  },
];

export function InformateSection() {
  const router = useRouter();

  return (
    <section id="info" className="max-w-7xl mx-auto px-6 py-10 md:py-12">
      <div className="mb-6 md:mb-8">
        <h2 className="text-4xl md:text-5xl font-black text-[#1E4D8C] mb-2">Infórmate</h2>
        <div className="h-1 w-32 bg-[#71A5D9] rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {INFO_CARDS.map((card, index) => (
          <InfoCard 
            key={index} 
            {...card} 
            onButtonClick={
              index === 0 ? () => router.push('/ansiedad') :
              index === 1 ? () => router.push('/salud-mental') :
              index === 2 ? () => router.push('/test') :
              undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
