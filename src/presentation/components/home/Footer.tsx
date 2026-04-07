export function Footer() {
  return (
    <footer id="test" className="bg-[#1E4D8C] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-lg mb-2">© 2026 MindPeace - Gestión de Ansiedad en Estudiantes Universitarios</p>
        <p className="text-sm text-blue-100">
          Contenido informativo. Si experimentas síntomas intensos o persistentes, busca apoyo de un profesional de salud mental.
        </p>
        <div className="mt-6 flex justify-center gap-6">
          <a href="/login" className="text-blue-100 hover:text-white font-bold">
            Iniciar Sesión
          </a>
          <span className="text-blue-300">|</span>
          <a href="/register" className="text-blue-100 hover:text-white font-bold">
            Crear Cuenta
          </a>
        </div>
      </div>
    </footer>
  );
}
