export function WelcomeBox() {
  const features = [
    'Conocimiento rápido de tu nivel de ansiedad con el Test GAD-7',
    'Herramientas prácticas: técnicas de respiración, atención plena y ejercicios para calmar la mente',
    'Información confiable sobre cómo funciona la ansiedad y cómo manejarla',
    'Conexión con psicólogos que pueden orientarte según tus necesidades',
    'Un ambiente confidencial y seguro diseñado especialmente para estudiantes como tú',
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl border-4 border-[#71A5D9] p-8 shadow-xl">
        <h2 className="text-3xl font-black text-[#1E4D8C] mb-4">¿Qué es MindPeace?</h2>
        
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          MindPeace es un espacio digital creado para ayudarte a manejar la ansiedad de forma práctica y accesible. 
          Nuestro sistema te permite conocer tu nivel de ansiedad, aprender técnicas efectivas, acceder a recursos educativos 
          y conectar con profesionales de salud mental para recibir seguimiento personalizado.
        </p>
        
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          <strong>¿Cómo mejora MindPeace tu bienestar?</strong>
        </p>
        
        <ul className="text-lg text-slate-700 leading-relaxed space-y-2 list-disc list-inside">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
