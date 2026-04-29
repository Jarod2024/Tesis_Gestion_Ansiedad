import Image from 'next/image';

export function HeroSection() {
  return (
    <section id="inicio" className="max-w-7xl mx-auto px-6 py-8 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Text Content */}
        <div>
          <h1 className="text-5xl md:text-6xl font-black text-[#1E4D8C] mb-6 leading-tight">
            Tu bienestar emocional importa
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed">
            Bienvenido a MindPeace, un espacio dedicado a la gestión de ansiedad en estudiantes universitarios. 
            Encontrarás información, herramientas y recursos para cuidar tu salud mental. Si lo necesitas, podrás encontrar ayuda profesional de especialistas en salud mental.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#recursos"
              className="text-center px-8 py-4 bg-[#71A5D9] text-white font-bold text-lg rounded-xl hover:bg-[#1E4D8C] shadow-xl transition transform hover:scale-105"
            >
              Explorar recursos
            </a>
            <a
              href="#info"
              className="text-center px-8 py-4 bg-white border-2 border-[#71A5D9] text-[#1E4D8C] font-bold text-lg rounded-xl hover:bg-blue-50 shadow-lg transition"
            >
              ¿Quieres conocer tu nivel de ansiedad?
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-64 md:h-[22rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#71A5D9]">
          <Image 
            src="/images/home-ansiedad.png" 
            alt="Bienestar" 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
            priority
          />
        </div>
      </div>
    </section>
  );
}
