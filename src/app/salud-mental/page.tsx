'use client';

import { useRouter } from 'next/navigation';
import { Heart, Lightbulb, AlertCircle, TrendingUp, ArrowRight } from 'lucide-react';

export default function SaludMentalPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Centrado */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-[#1E4D8C] mb-4">Salud Mental</h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">Tu bienestar emocional es fundamental. Descubre los pilares para cuidar tu salud mental integral.</p>
        </div>

        {/* 5 Pilares */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-[#1E4D8C] mb-8">5 Pilares de la Salud Mental</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { title: 'Sueño', desc: '7-8 horas de calidad para recuperarte' },
              { title: 'Actividad', desc: 'Movimiento físico regular' },
              { title: 'Conexiones', desc: 'Relaciones significativas' },
              { title: 'Nutrición', desc: 'Alimentación balanceada' },
              { title: 'Estrés', desc: 'Gestión consciente del estrés' }
            ].map((pilar, i) => (
              <div key={i} className="bg-white rounded-lg p-5 text-center border-2 border-[#71A5D9]">
                <h3 className="font-black text-[#1E4D8C] mb-2 text-lg">{pilar.title}</h3>
                <p className="text-slate-700 text-xs">{pilar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Señales y Estrategias */}
        <div className="mb-16">
          <h2 className="text-4xl font-black text-[#1E4D8C] mb-12 text-center">Reconoce y Maneja tu Bienestar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Señales */}
            <div className="bg-white rounded-lg p-6 border-2 border-[#71A5D9]">
              <h3 className="text-2xl font-black text-[#1E4D8C] mb-6">Señales de Alerta</h3>
              <p className="text-slate-600 text-sm mb-6">Estos signos pueden indicar que necesitas prestar más atención a tu salud mental:</p>
              <div className="space-y-4">
                {[
                  'Cambios persistentes de humor, irritabilidad o tristeza sin razón aparente',
                  'Pérdida de interés en actividades que normalmente disfrutabas',
                  'Cambios en patrones de sueño (insomnio o somnolencia) o apetito',
                  'Aislamiento social o evitar contacto con amigos y familia',
                  'Pensamientos negativos recurrentes o autocrítica excesiva',
                  'Dificultad para concentrarse, recordar o tomar decisiones'
                ].map((item, i) => (
                  <div key={i} className="bg-blue-50 rounded-lg p-4 border border-[#71A5D9]">
                    <p className="text-slate-700 text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Estrategias */}
            <div className="bg-white rounded-lg p-6 border-2 border-[#71A5D9]">
              <h3 className="text-2xl font-black text-[#1E4D8C] mb-6">Estrategias de Bienestar</h3>
              <p className="text-slate-600 text-sm mb-6">Acciones prácticas que puedes implementar hoy para mejorar tu salud mental:</p>
              <div className="space-y-4">
                {[
                  'Practica respiración profunda 5 minutos diarios - calma el sistema nervioso',
                  'Realiza actividades que te traigan alegría o paz cada día',
                  'Mantén horarios consistentes para dormir y comer - estabiliza tu estado emocional',
                  'Busca conversaciones significativas con personas que te apoyan',
                  'Desafía pensamientos negativos cuestionando si son realmente ciertos',
                  'No dudes en consultar con un profesional de salud mental cuando sea necesario'
                ].map((item, i) => (
                  <div key={i} className="bg-blue-50 rounded-lg p-4 border border-[#71A5D9]">
                    <p className="text-slate-700 text-sm font-medium">✓ {item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Construye Hábitos */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-[#1E4D8C] mb-8">Construye Hábitos Saludables</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Rutina Diaria',
                items: [
                  'Despierta y acuéstate a la misma hora',
                  'Establece horarios fijos para comidas',
                  'Reserva momentos para ti mismo',
                  'Duerme 7-8 horas cada noche'
                ]
              },
              {
                title: 'Autocuidado',
                items: [
                  'Mantén buena higiene personal',
                  'Realiza actividades que disfrutes',
                  'Practica técnicas de relajación',
                  'Descansa adecuadamente'
                ]
              },
              {
                title: 'Crecimiento Personal',
                items: [
                  'Aprende algo nuevo regularmente',
                  'Establece metas pequeñas y alcanzables',
                  'Celebra tus logros, grandes o pequeños',
                  'Practica la autocompasión'
                ]
              }
            ].map((habito, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border-2 border-[#71A5D9]">
                <h3 className="font-black text-[#1E4D8C] mb-4 text-lg">{habito.title}</h3>
                <div className="space-y-3">
                  {habito.items.map((item, j) => (
                    <div key={j} className="bg-blue-50 rounded p-3 text-center">
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
              'Interfieren significativamente en tus actividades diarias, trabajo o relaciones',
              'Experimentas pensamientos de autolesión o desesperanza'
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border-2 border-[#71A5D9] text-center">
                <p className="text-slate-700 text-sm font-medium">{item}</p>
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
