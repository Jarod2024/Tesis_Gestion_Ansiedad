'use client';

import { useRouter } from 'next/navigation';
import { AlertCircle, Shield, HelpCircle, Lightbulb, ArrowRight } from 'lucide-react';

export default function AnsiedadPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-16">
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
                items: [
                  'Palpitaciones o aceleración del corazón',
                  'Opresión en el pecho que causa dificultad respiratoria',
                  'Tensión muscular, especialmente en cuello y hombros',
                  'Sudoración excesiva o temblores'
                ] 
              },
              { 
                title: 'Síntomas Emocionales', 
                items: [
                  'Preocupación excesiva sobre el futuro',
                  'Irritabilidad o sensibilidad aumentada',
                  'Cambios bruscos de humor',
                  'Sensación de pánico o terror sin razón clara'
                ] 
              },
              { 
                title: 'Síntomas Cognitivos', 
                items: [
                  'Dificultad para concentrarse o mantener el enfoque',
                  'Insomnio o sueño de mala calidad',
                  'Pensamientos negativos o catastrofistas',
                  'Mente acelerada sin poder parar'
                ] 
              }
            ].map((categoria, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border-2 border-[#71A5D9]">
                <h3 className="font-black text-[#1E4D8C] mb-4 text-lg">{categoria.title}</h3>
                <ul className="space-y-3">
                  {categoria.items.map((item, j) => (
                    <div key={j} className="bg-blue-50 rounded p-3 text-center">
                      <p className="text-slate-700 text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </ul>
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
                items: [
                  'Respiración 4-7-8: Inhala 4, retiene 7, exhala 8 segundos',
                  'Grounding 5-4-3-2-1: Nombra 5 cosas que ves, 4 que tocas, 3 que oyes, 2 que hueles, 1 que saboreas',
                  'Movimiento físico: Camina, salta o muévete para liberar energía',
                  'Relajación progresiva: Tensa y relaja cada grupo muscular'
                ] 
              },
              { 
                title: 'Hábitos Cotidianos Preventivos', 
                items: [
                  'Mantén una rutina consistente día a día',
                  'Realiza ejercicio regular: 30 minutos casi todos los días',
                  'Prioriza sueño de calidad: 7-8 horas cada noche',
                  'Cultiva conexión social: Pasa tiempo con personas que te apoyan'
                ] 
              }
            ].map((area, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border-2 border-[#71A5D9]">
                <h3 className="font-black text-[#1E4D8C] mb-6 text-xl">{area.title}</h3>
                <div className="space-y-4">
                  {area.items.map((item, j) => (
                    <div key={j} className="bg-blue-50 rounded-lg p-4 border border-[#71A5D9]">
                      <p className="text-slate-700 text-sm font-medium">{item}</p>
                    </div>
                  ))}
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
              'Interfieren significativamente en tu trabajo, escuela o relaciones personales',
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
                title: 'Autocuidado', 
                desc: 'Dedica tiempo diario a actividades que disfrutes y que te relajen: lectura, música, baños relajantes o hobbies que te apasionan' 
              },
              { 
                title: 'Apoyo Social', 
                desc: 'Mantén conexión regular con amigos y familia que te apoyan. No dudes en compartir cómo te sientes con personas de confianza' 
              },
              { 
                title: 'Manejo Emocional', 
                desc: 'Aprende a reconocer y validar tus sentimientos sin juzgarte. La ansiedad es humana; aceptarla es el primer paso para manejarla' 
              }
            ].map((consejo, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border-2 border-[#71A5D9]">
                <h3 className="font-black text-[#1E4D8C] mb-3 text-lg">{consejo.title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed">{consejo.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#71A5D9] text-white font-bold rounded-lg hover:bg-[#1E4D8C] transition shadow-lg"
          >
            Volver al Inicio
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
