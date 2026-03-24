// src/app/page.tsx
export default function TestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="rounded-2xl bg-white p-10 shadow-xl border border-blue-100 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 animate-bounce">
          ¡Tailwind funcionando! 🚀
        </h1>
        <p className="text-slate-600 text-lg">
          Si ves este texto azul, centrado y con una sombra suave, 
          la configuración de estilos para el <span className="font-semibold text-emerald-500">SGA-ESPE</span> es correcta.
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
          Prueba de Interacción
        </button>
      </div>
    </div>
  );
}