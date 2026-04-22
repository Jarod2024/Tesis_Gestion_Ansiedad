'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { AlertCircle, Shield, HelpCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { PatientHeader } from '@/presentation/components/patient/PatientHeader';
import Image from 'next/image';

export default function PacienteAnsiedadPage() {
  const [activeSection, setActiveSection] = useState('info');
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (!mounted || status === 'loading' || !session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <PatientHeader
        activeSection={activeSection}
        onNavClick={setActiveSection}
        userName={session?.user?.name || 'Paciente'}
        userRole={session?.user?.role || 'ESTUDIANTE'}
      />
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Centrado */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-black text-[#1E4D8C] mb-4">Ansiedad</h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">La ansiedad es una respuesta natural del cuerpo ante situaciones de estrés. Aprende a reconocerla, entenderla y manejarla con estrategias prácticas.</p>
          </div>

          {/* Síntomas */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-[#1E4D8C] mb-8">Síntomas Comunes de la Ansiedad</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Síntomas Físicos', 
                  image: '/images/educational/Sintomas-Fisicos.png',
                  items: [
                    'Palpitaciones o aceleración del corazón',
                    'Opresión en el pecho que causa dificultad respiratoria',
                    'Tensión muscular, especialmente en cuello y hombros',
                    'Sudoración excesiva o temblores'
                  ] 
                },
                { 
                  title: 'Síntomas Emocionales', 
                  image: '/images/educational/Sintomas-emocionales.jpg',
                  items: [
                    'Preocupación excesiva sobre el futuro',
                    'Irritabilidad o sensibilidad aumentada',
                    'Cambios bruscos de humor',
                    'Sensación de pánico o terror sin razón clara'
                  ] 
                },
                { 
                  title: 'Síntomas Cognitivos', 
                  image: '/images/educational/Sintomas-cognitivos.jpg',
                  items: [
                    'Dificultad para concentrarse o mantener el enfoque',
                    'Insomnio o sueño de mala calidad',
                    'Pensamientos negativos o catastrofistas',
                    'Mente acelerada sin poder parar'
                  ] 
                }
              ].map((categoria, i) => (
                <div key={i} className="bg-white rounded-lg border-2 border-[#71A5D9] overflow-hidden">
                  {/* Imagen que ocupa todo el ancho */}
                  <div className="relative w-full h-56">
                    <Image
                      src={categoria.image}
                      alt={categoria.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-black text-[#1E4D8C] mb-4 text-lg text-center">{categoria.title}</h3>
                    <ul className="space-y-3">
                      {categoria.items.map((item, j) => (
                        <div key={j} className="bg-blue-50 rounded p-3 text-center">
                          <p className="text-slate-700 text-sm font-medium">{item}</p>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estrategias */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-[#1E4D8C] mb-8">Estrategias que Funcionan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: 'Técnicas Inmediatas para Crisis', 
                  image: '/images/educational/Tecnicas-Inmediatas.png',
                  items: [
                    'Respiración 4-7-8: Inhala 4, retiene 7, exhala 8 segundos',
                    'Grounding 5-4-3-2-1: Nombra 5 cosas que ves, 4 que tocas, 3 que oyes, 2 que hueles, 1 que saboreas',
                    'Movimiento físico: Camina, salta o muévete para liberar energía',
                    'Relajación progresiva: Tensa y relaja cada grupo muscular'
                  ] 
                },
                { 
                  title: 'Hábitos Cotidianos Preventivos', 
                  image: '/images/educational/Habitos-cotidianos.png',
                  items: [
                    'Mantén una rutina consistente día a día',
                    'Realiza ejercicio regular: 30 minutos 4 días a la semana',
                    'Prioriza sueño de calidad: 7-8 horas cada noche',
                    'Cultiva conexión social: Pasa tiempo con personas que te apoyan'
                  ] 
                }
              ].map((area, i) => (
                <div key={i} className="bg-white rounded-lg border-2 border-[#71A5D9] overflow-hidden">
                  {/* Imagen que ocupa todo el ancho */}
                  <div className="relative w-full h-56">
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-black text-[#1E4D8C] mb-6 text-xl text-center">{area.title}</h3>
                    <div className="space-y-4">
                      {area.items.map((item, j) => (
                        <div key={j} className="bg-blue-50 rounded-lg p-4 border border-[#71A5D9]">
                          <p className="text-slate-700 text-sm font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cuándo buscar ayuda */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-[#1E4D8C] mb-8">Cuándo Buscar Ayuda Profesional</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                'Los síntomas persisten más de 2 semanas sin mejoría',
                'Limitan tu desempeño académico, laboral o relaciones personales',
                'Experimentas pensamientos de autolesión o ataques de pánico frecuentes'
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg p-6 border-2 border-[#71A5D9] text-center">
                  <p className="text-slate-700 text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Consejos Adicionales */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-[#1E4D8C] mb-8">Consejos Adicionales para Manejar la Ansiedad</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Actividades de Relajación', 
                  desc: 'Participa en actividades que disfrutes: meditación, yoga, música, deportes o tiempo en espacios verdes del campus. Tu bienestar mental es fundamental' 
                },
                { 
                  title: 'Comunidad Estudiantil', 
                  desc: 'Conecta con otros estudiantes de ESPE a través de grupos de estudio, clubes y actividades extracurriculares. El apoyo de tus pares es invaluable' 
                },
                { 
                  title: 'Equilibrio Académico', 
                  desc: 'Organiza tu tiempo de estudio, establece límites saludables y no dudes en buscar apoyo académico cuando lo necesites. Tu éxito va más allá de las calificaciones' 
                }
              ].map((consejo, i) => (
                <div key={i} className="bg-white rounded-lg p-6 border-2 border-[#71A5D9]">
                  <h3 className="font-black text-[#1E4D8C] mb-3 text-lg text-center">{consejo.title}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed text-center">{consejo.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <button
              onClick={() => router.push('/dashboard/paciente')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#71A5D9] text-white font-bold rounded-lg hover:bg-[#1E4D8C] transition shadow-lg"
            >
              Volver al Inicio
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}