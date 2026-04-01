'use client'

import { X } from "lucide-react"; // Eliminamos useState si no se usa
import { createPsychologistAction } from "@/infrastructure/actions/psychologist.actions";

// Definimos la interfaz aquí o la importamos para que TS sepa qué esperar
interface PsychologistFormData {
  name: string;
  email: string;
  password: string;
  especialidad: string;
  contacto: string;
}

export function CreatePsychologistModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  // Cambiamos el tipo de evento a uno más estándar para evitar el "deprecated"
  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    // Realizamos el cast 'as unknown as PsychologistFormData' para calmar a TS
    const data = Object.fromEntries(formData.entries()) as unknown as PsychologistFormData;

    const result = await createPsychologistAction(data);
    
    if (result.success) {
      alert("Psicólogo creado con éxito");
      onClose();
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#F7F7F7] w-full max-w-md rounded-3xl border-4 border-gray-800 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#AFC8E8] p-6 border-b-4 border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-black text-gray-900 uppercase">Nuevo Psicólogo</h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          
          <div>
            <label className="block text-xs font-black uppercase mb-1 text-gray-700">Nombre Completo</label>
            <input 
              name="name" 
              required 
              className="w-full p-3 bg-[#EAF2FB] border-2 border-gray-700 rounded-xl focus:bg-white outline-none text-gray-900 placeholder-gray-500" 
              placeholder="Ej. Dr. Juan Pérez" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase mb-1 text-gray-700">Correo Electrónico</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full p-3 bg-[#EAF2FB] border-2 border-gray-700 rounded-xl focus:bg-white outline-none text-gray-900 placeholder-gray-500" 
              placeholder="correo@ejemplo.com" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1 text-gray-700">Especialidad</label>
              <input 
                name="especialidad" 
                required 
                className="w-full p-3 bg-[#EAF2FB] border-2 border-gray-700 rounded-xl focus:bg-white outline-none text-gray-900 placeholder-gray-500" 
                placeholder="Clínica" 
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1 text-gray-700">Contacto</label>
              <input 
                name="contacto" 
                required 
                className="w-full p-3 bg-[#EAF2FB] border-2 border-gray-700 rounded-xl focus:bg-white outline-none text-gray-900 placeholder-gray-500" 
                placeholder="099..." 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1 text-gray-700">Contraseña Temporal</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full p-3 bg-[#EAF2FB] border-2 border-gray-700 rounded-xl focus:bg-white outline-none text-gray-900 placeholder-gray-500" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#AFC8E8] hover:bg-[#94B6DF] border-4 border-gray-800 py-3 rounded-xl font-black uppercase text-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            Guardar Psicólogo
          </button>
        </form>
      </div>
    </div>
  );
}