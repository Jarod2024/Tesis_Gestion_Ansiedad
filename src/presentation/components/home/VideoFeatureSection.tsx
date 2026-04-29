'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

export function VideoFeatureSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      {/* Elemento pegado a la izquierda */}
      <section id="caracteristicas" className="max-w-7xl mx-auto px-6 py-0">
        <button
          onClick={() => setIsVideoOpen(true)}
          className="group flex items-center gap-4 px-6 py-3.5 bg-[#71A5D9] hover:bg-[#1E4D8C] rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 w-fit"
        >
          <div className="p-2 bg-white/20 rounded-lg">
            <Play size={24} className="text-white" />
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-lg">¿Qué es la ansiedad?</p>
            <p className="text-white/80 text-sm">Entiende la ansiedad, sus síntomas y cómo afecta tu vida</p>
          </div>
        </button>
      </section>

      {/* Modal del Video */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            {/* Botón cerrar */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
            >
              ✕
            </button>

            {/* Video embebido */}
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/3BOVSMnLecs"
                title="Manejo de Ansiedad: Estrategias Prácticas"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Descripción */}
            <div className="bg-gray-900 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">¿Qué es la ansiedad?</h3>
              <p className="text-gray-300 text-sm">
                Descubre qué es la ansiedad, sus síntomas físicos y emocionales, y cómo puede afectar tu vida diaria. 
                Un video educativo que te ayuda a reconocer la ansiedad como síntoma, rasgo o trastorno, recordándote que no estás solo.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
