"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import Image from 'next/image';

// Esquema de validación con Zod
const loginSchema = z.object({
  email: z.string()
    .email("Correo inválido")
    .endsWith("@espe.edu.ec", "Usa tu correo institucional @espe.edu.ec"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        // Redirección por roles según la ERS
        if (result.role === "PACIENTE") router.push("/dashboard/paciente");
        else if (result.role === "PSICOLOGO") router.push("/dashboard/psicologo");
        else if (result.role === "ADMINISTRADOR") router.push("/dashboard/admin");
      } else {
        setServerError(result.error || "Credenciales incorrectas");
      }
    } catch (err) {
      setServerError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6">
      {/* Contenedor Principal Centrado con Gap Amplio */}
      <div className="flex w-full max-w-5xl flex-col md:flex-row items-center justify-center gap-16">
        
        {/* Columna Izquierda: Ilustración (Estilo Mockup) */}
        <div className="hidden md:flex flex-col items-center justify-center flex-1">
          <div className="relative w-full aspect-square max-w-lg">
             <Image
                src="/images/login1-.png"
                 alt="Ilustración Psicología"
                  fill
                  className="object-contain"
                />
          </div>
        </div>

        {/* Columna Derecha: Formulario de Login */}
        <div className="w-full max-w-md bg-[#D9E9FF] p-10 rounded-[45px] shadow-xl flex flex-col items-center border border-white/50">
          
          {/* Logo Circular */}
          <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md border border-blue-200">
            <Image
              src="/images/logo-.png"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#1E4D8C] mb-8 tracking-widest uppercase">MINDPEACE</h1>
          
          <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Email / Usuario */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E4D8C]/50" size={20} />
              <input 
                {...register("email")}
                type="email" 
                placeholder="Usuario (@espe.edu.ec)"
                className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 shadow-inner ${errors.email ? 'ring-2 ring-red-300' : ''}`}
              />
              {errors.email && (
                <p className="text-[10px] text-[#1E4D8C] mt-1 ml-2 font-bold uppercase italic">
                  {errors.email.message}
                </p>
              )}
            </div>
            
            {/* Contraseña */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E4D8C]/50" size={20} />
              <input 
                {...register("password")}
                type="password" 
                placeholder="Contraseña"
                className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 shadow-inner ${errors.password ? 'ring-2 ring-red-300' : ''}`}
              />
              {errors.password && (
                <p className="text-[10px] text-[#1E4D8C] mt-1 ml-2 font-bold uppercase italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Olvidaste Contraseña */}
            <div className="text-right">
              <Link href="#" className="text-xs text-[#1E4D8C] italic hover:underline font-medium">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Error del Servidor */}
            {serverError && (
              <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl text-center font-bold border border-red-100">
                {serverError}
              </p>
            )}

            {/* Botón de Acción */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#71A5D9] hover:bg-[#1E4D8C] text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Iniciar Sesión"}
            </button>
            
            {/* Registro */}
            <div className="text-center mt-6">
              <p className="text-xs text-[#1E4D8C]/70 italic font-medium">
                ¿No tienes cuenta?  
                <Link href="/register" className="text-[#1E4D8C] font-bold ml-1 hover:underline">
                  Crear cuenta
                </Link>
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};