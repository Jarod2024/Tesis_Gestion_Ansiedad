'use client'

import { X } from "lucide-react";
import { updatePsychologistAction } from "@/infrastructure/actions/psychologist.actions";
import { Psychologist } from "@/domain/dtos/psychologist.dto";

// 1. Definimos la interfaz para que coincida con la acción del servidor
interface PsychologistFormData {
  name: string;
  email: string;
  especialidad: string;
  contacto: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  psychologist: Psychologist | null;
}

export function EditPsychologistModal({ isOpen, onClose, psychologist }: Props) {
  if (!isOpen || !psychologist) return null;

  // 2. Usamos BaseSyntheticEvent para evitar el aviso de "deprecated"
  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    // 3. Convertimos y forzamos el tipo de dato (casting)
    const data = Object.fromEntries(formData.entries()) as unknown as PsychologistFormData;

    const result = await updatePsychologistAction(psychologist.id, data);
    
    if (result.success) {
      alert("Psicólogo actualizado correctamente");
      onClose();
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
   <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl border-4 border-gray-800 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        
        <div className="bg-[#B6D4F5] p-6 border-b-4 border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-black text-gray-900 uppercase">Editar Psicólogo</h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          
          <div>
            <label className="block text-xs font-black uppercase mb-1 text-gray-700">
              Nombre Completo
            </label>
            <input 
              name="name" 
              defaultValue={psychologist.name} 
              required 
              className="w-full p-3 border-2 border-gray-800 rounded-xl focus:bg-blue-50 outline-none text-gray-900 placeholder-gray-500" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase mb-1 text-gray-700">
              Correo Electrónico
            </label>
            <input 
              name="email" 
              type="email" 
              defaultValue={psychologist.email} 
              required 
              className="w-full p-3 border-2 border-gray-800 rounded-xl focus:bg-blue-50 outline-none text-gray-900 placeholder-gray-500" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1 text-gray-700">
                Especialidad
              </label>
              <input 
                name="especialidad" 
                defaultValue={psychologist.especialidad} 
                required 
                className="w-full p-3 border-2 border-gray-800 rounded-xl focus:bg-blue-50 outline-none text-gray-900 placeholder-gray-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1 text-gray-700">
                Contacto
              </label>
              <input 
                name="contacto" 
                defaultValue={psychologist.contacto} 
                required 
                className="w-full p-3 border-2 border-gray-800 rounded-xl focus:bg-blue-50 outline-none text-gray-900 placeholder-gray-500" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#B6D4F5] hover:bg-blue-400 border-4 border-gray-800 py-3 rounded-xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all text-gray-900"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}