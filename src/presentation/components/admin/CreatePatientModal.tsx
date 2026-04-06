'use client'

import { X } from "lucide-react";
import { useState } from "react";
// Agrega CreatePatientData aquí adentro de las llaves { }
import { createPatientAction, CreatePatientData } from "@/infrastructure/actions/patient.actions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}


export function CreatePatientModal({ isOpen, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    // 2. Quitamos el 'as any' y usamos la interfaz exportada
    const data = Object.fromEntries(formData) as unknown as CreatePatientData;

    const result = await createPatientAction(data);
    
    setLoading(false);
    if (result.success) {
      alert("Paciente creado con éxito");
      onClose();
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl border-4 border-gray-800 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Encabezado del Modal */}
        <div className="bg-[#D1E7FF] border-b-4 border-gray-800 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-black text-gray-900 uppercase">NUEVO PACIENTE</h2>
          <button 
            onClick={onClose}
            className="hover:bg-red-400 p-1 rounded-full border-2 border-transparent hover:border-gray-800 transition-all"
          >
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Campo: Nombre Completo */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-700 uppercase ml-1">Nombre Completo</label>
            <input 
              name="name"
              required
              type="text" 
              placeholder="Ej. Juan Pérez"
              className="w-full p-4 rounded-2xl border-4 border-gray-800 bg-gray-50 focus:bg-white focus:outline-none font-bold text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Campo: Correo Electrónico */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-700 uppercase ml-1">Correo Electrónico</label>
            <input 
              name="email"
              required
              type="email" 
              placeholder="usuario@ejemplo.com"
              className="w-full p-4 rounded-2xl border-4 border-gray-800 bg-gray-50 focus:bg-white focus:outline-none font-bold text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Dos columnas: Teléfono y Contraseña */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase ml-1">Contacto</label>
              <input 
                name="contacto"
                required
                type="text" 
                placeholder="09XXXXXXXX"
                className="w-full p-4 rounded-2xl border-4 border-gray-800 bg-gray-50 focus:bg-white focus:outline-none font-bold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase ml-1">Contraseña Temporal</label>
              <input 
                name="password"
                required
                type="password" 
                placeholder="••••••••"
                className="w-full p-4 rounded-2xl border-4 border-gray-800 bg-gray-50 focus:bg-white focus:outline-none font-bold text-gray-900"
              />
            </div>
          </div>

          {/* Botón de Acción */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#D1E7FF] hover:bg-green-400 text-gray-900 border-4 border-gray-800 py-4 rounded-2xl font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50 uppercase"
          >
            {loading ? "GUARDANDO..." : "GUARDAR PACIENTE"}
          </button>
        </form>
      </div>
    </div>
  );
}