"use client";
import { useState } from "react";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ ...formData, role: "PACIENTE" }),
    });
    const data = await res.json();
    setMsg(data.error || data.message);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-blue-50 w-full max-w-md">
      <h2 className="text-3xl font-bold text-slate-700 mb-2 text-center">Únete a SGA-ESPE</h2>
      <p className="text-slate-500 text-center mb-8">Crea tu cuenta institucional</p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <input 
          type="text" placeholder="Nombre completo"
          className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input 
          type="email" placeholder="usuario@espe.edu.ec"
          className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input 
          type="password" placeholder="Contraseña segura"
          className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <button className="w-full bg-emerald-400 hover:bg-emerald-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-transform active:scale-95">
          Crear mi cuenta
        </button>
      </form>
      {msg && <p className="mt-4 text-center text-sm font-medium text-blue-600 animate-pulse">{msg}</p>}
    </div>
  );
};