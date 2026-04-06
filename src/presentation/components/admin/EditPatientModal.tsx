'use client'

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Patient } from "@/domain/dtos/patient.dto";
import { updatePatientAction, UpdatePatientData } from "@/infrastructure/actions/patient.actions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null; // Recibe el paciente a editar
}

export function EditPatientModal({ isOpen, onClose, patient }: Props) {
  const [loading, setLoading] = useState(false);

  // Si no hay paciente seleccionado o el modal está cerrado, no renderizamos nada
  if (!isOpen || !patient) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    // Usamos el tipado correcto para evitar el error de 'any'
    const data = Object.fromEntries(formData) as unknown as UpdatePatientData;

    const result = await updatePatientAction(patient.id, data);
    
    setLoading(false);
    if (result.success) {
      alert("Paciente actualizado correctamente");
      onClose();
    } else {
      alert("Error al actualizar: " + result.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl border-4 border-gray-800 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Encabezado azul neobrutalista */}
        <div className="bg-[#D1E7FF] border-b-4 border-gray-800 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-black text-gray-900 uppercase">EDITAR PACIENTE</h2>
          <button onClick={onClose} className="hover:bg-red-400 p-1 rounded-full border-2 border-transparent hover:border-gray-800 transition-all">
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-700 uppercase ml-1">Nombre Completo</label>
            <input 
              name="name"
              required
              defaultValue={patient.name}
              type="text" 
              className="w-full p-4 rounded-2xl border-4 border-gray-800 bg-gray-50 focus:bg-white focus:outline-none font-bold text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-700 uppercase ml-1">Correo Electrónico</label>
            <input 
              name="email"
              required
              defaultValue={patient.email}
              type="email" 
              className="w-full p-4 rounded-2xl border-4 border-gray-800 bg-gray-50 focus:bg-white focus:outline-none font-bold text-gray-900"
            />
          </div>

          {/* Fila de dos columnas para Teléfono y Estado */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase ml-1">Contacto</label>
              <input 
                name="contacto"
                required
                defaultValue={patient.contacto}
                type="text" 
                className="w-full p-4 rounded-2xl border-4 border-gray-800 bg-gray-50 focus:outline-none font-bold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase ml-1">Estado</label>
              <select 
                name="estado"
                defaultValue={patient.estado}
                className="w-full p-4 rounded-2xl border-4 border-gray-800 bg-gray-50 focus:outline-none font-black text-gray-900 appearance-none cursor-pointer"
              >
                <option value="Activo">ACTIVO</option>
                <option value="Inactivo">INACTIVO</option>
                <option value="Pendiente">PENDIENTE</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#D1E7FF] hover:bg-yellow-300 text-gray-900 border-4 border-gray-800 py-4 rounded-2xl font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50 uppercase"
          >
            {loading ? "ACTUALIZANDO..." : "ACTUALIZAR DATOS"}
          </button>
        </form>
      </div>
    </div>
  );
}