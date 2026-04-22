import { BookOpen, Play, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { InfoCard } from './InfoCard';

const RESOURCE_CARDS = [
  {
    icon: <BookOpen size={56} />,
    title: 'Guías de Autoayuda',
    description: 'Material práctico y verificado para manejar ansiedad académica, social y personal con estrategias probadas.',
    buttonText: 'Ver Guías',
  },
  {
    icon: <Play size={56} />,
    title: 'Videos Educativos',
    description: 'Contenido audiovisual sobre técnicas de respiración, atención plena y regulación emocional.',
    buttonText: 'Ver Videos',
  },
  {
    icon: <Zap size={56} />,
    title: 'Técnicas Rápidas',
    description: 'Estrategias de estabilización inmediata que puedes aplicar en momentos de ansiedad intensa para recuperar el control.',
    buttonText: 'Ver Técnicas',
  },
];

export function RecursosSection() {
  const router = useRouter();

  return (
    <section id="recursos" className="bg-gradient-to-r from-[#dfe9f8] to-[#e8f1ff] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-[#1E4D8C] mb-2">Recursos</h2>
          <div className="h-1 w-32 bg-[#71A5D9] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESOURCE_CARDS.map((card, index) => (
            <InfoCard 
              key={index} 
              {...card} 
              onButtonClick={
                index === 0 ? () => router.push('/biblioteca') :
                index === 1 ? () => router.push('/videos') :
                undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
