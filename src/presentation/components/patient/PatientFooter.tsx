export function PatientFooter() {
  return (
    <footer className="border-t-2 border-[#1E4D8C] bg-[#71A5D9] text-black py-10 mt-8">
      <div className="max-w-7xl mx-auto px-8">
        {/* Contenido centrado con pequeño desplazamiento a la derecha */}
        <div className="text-center md:pl-70">
          <p className="text-lg font-black text-[#1E4D8C] mb-4">
            © 2026 MindPeace - Gestión de Ansiedad en Estudiantes Universitarios
          </p>
          
          <p className="text-base font-medium text-black/75 max-w-3xl mx-auto">
            Si experimentas síntomas intensos o persistentes, busca apoyo de un profesional de salud mental.
          </p>
        </div>
      </div>
    </footer>
  );
}