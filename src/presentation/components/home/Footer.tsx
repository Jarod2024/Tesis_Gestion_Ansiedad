export function Footer() {
  return (
    <footer className="border-t-2 border-[#1E4D8C] bg-[#71A5D9] text-black py-10 mt-8">
      <div className="max-w-7xl mx-auto px-8">
        {/* Centrado con un pequeño desplazamiento a la derecha */}
        <div className="text-center md:pl-70">
          <p className="text-lg font-black text-[#1E4D8C] mb-4">
            © 2026 MindPeace - Gestión de Ansiedad en Estudiantes Universitarios
          </p>
          
          <p className="text-base font-medium text-black/75 max-w-3xl mx-auto mb-6">
            Si experimentas síntomas intensos o persistentes, busca apoyo de un profesional de salud mental.
          </p>
          
          <div className="flex items-center justify-center gap-6">
            <a 
              href="/login" 
              className="text-base font-bold text-[#1E4D8C] hover:text-white transition-colors duration-200"
            >
              Iniciar sesión
            </a>
            <span className="text-[#1E4D8C]/50 text-lg">|</span>
            <a 
              href="/register" 
              className="text-base font-bold text-[#1E4D8C] hover:text-white transition-colors duration-200"
            >
              Crear cuenta
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}