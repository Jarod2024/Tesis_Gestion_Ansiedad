import Image from 'next/image';
import { ChevronRight, Info } from "lucide-react";

export function PatientDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* SECCIÓN BIENVENIDO */}
      <section className="bg-[#D1E7FF] border-2 border-black p-8 rounded-xl flex justify-between items-center relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black uppercase text-gray-900">Bienvenido</h2>
          </div>
          <p className="text-gray-800 font-medium leading-relaxed">
            Descripción: Breve descripción sobre gestión de ansiedad. Aquí podrás encontrar herramientas 
            para tu bienestar emocional y seguimiento de tus actividades diarias.
          </p>
        </div>
        <div className="hidden md:block">
          <Image 
            src="/images/paciente-welcome.png" 
            alt="Personaje Ilustrativo" 
            width={180} 
            height={180} 
            className="object-contain"
          />
        </div>
      </section>

      {/* SECCIÓN INFÓRMATE */}
      <div className="border-2 border-black rounded-xl p-6 bg-[#D1E7FF] space-y-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-black uppercase text-gray-900">Infórmate</h3>
          <Info size={20} className="text-blue-800" strokeWidth={3} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['ANSIEDAD', 'DEPRESIÓN', 'ANÁLISIS PERSONAL'].map((item) => (
            <div 
              key={item} 
              className="bg-[#B3D8F5] border-2 border-black p-6 rounded-lg text-center space-y-4 hover:bg-[#9fd0f0] transition-all"
            >
              <h4 className="font-black text-sm text-gray-900 uppercase tracking-tight">
                {item}
              </h4>
              <p className="text-[12px] text-gray-800 font-medium">
                Descripción sobre el recurso informativo, textos, artículos y material de apoyo.
              </p>
              <button className="flex items-center justify-center gap-1 w-full text-[11px] font-black uppercase text-gray-900 hover:underline">
                Más información <ChevronRight size={14} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN RECURSOS */}
      <div className="border-2 border-black rounded-xl p-6 bg-[#D1E7FF] space-y-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-lg font-black uppercase text-gray-900">Recursos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Guías de Autoayuda', btn: 'Ver guías' },
            { title: 'Videos Educativos', btn: 'Ver Videos' },
            { title: 'Técnicas de Rápida Estabilización', btn: 'Ver Técnicas' }
          ].map((item) => (
            <div 
              key={item.title} 
              className="bg-[#B3D8F5] border-2 border-black p-6 rounded-lg text-center flex flex-col justify-between space-y-5"
            >
              <div>
                <h4 className="font-black text-sm mb-2 uppercase text-gray-900">
                  {item.title}
                </h4>
                <p className="text-[12px] text-gray-800 font-medium">
                  Descripción: guías prácticas sobre el manejo de ansiedad, depresión y niveles de estrés.
                </p>
              </div>
              <button className="bg-white border-2 border-black px-6 py-2 rounded-lg text-[11px] font-black uppercase text-gray-900 hover:bg-gray-200 transition-all self-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {item.btn}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}