"use client";

export const LoginForm = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6 text-center">SGA-ESPE</h1>
      <div className="space-y-4">
        <input 
          type="email" 
          placeholder="Correo @espe.edu.ec"
          className="w-full p-3 rounded-xl border border-slate-200 focus:border-blue-300 outline-none"
        />
        <input 
          type="password" 
          placeholder="Contraseña"
          className="w-full p-3 rounded-xl border border-slate-200 focus:border-blue-300 outline-none"
        />
        <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors">
          Entrar al Sistema
        </button>
      </div>
    </div>
  );
};