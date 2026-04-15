"use client";
import React, { useState } from 'react';
import { Search, User, Calendar, FileText, ClipboardList, Activity, Mail, Phone, LucideIcon } from 'lucide-react';
import { PatientListItemDTO } from "@/domain/dtos/patient-management.dto";

interface Props {
  patients: PatientListItemDTO[];
}

export function PatientManager({ patients }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(patients[0]?.id || null);
  
  // CORRECCIÓN: Definimos activeTab para controlar las pestañas
  const [activeTab, setActiveTab] = useState("Citas");

  const selectedPatient = patients.find(p => p.id === selectedId);
  const filteredPatients = patients.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Buscador */}
      <div className="bg-[#EEF2FF] p-4 rounded-xl border border-blue-100 flex gap-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-blue-400" size={18} />
          <input 
            type="text"
            placeholder="Buscar por nombre del estudiante..."
            className="w-full bg-transparent pl-10 pr-4 py-1 text-sm outline-none border-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-blue-600 text-white px-8 py-2 rounded-lg font-black text-xs uppercase hover:bg-blue-700 transition-all">
          Buscar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LISTA DE PACIENTES */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-blue-600 p-3 rounded-t-xl shadow-md">
            <h3 className="text-white text-[11px] font-black uppercase tracking-widest text-center">Lista de Pacientes</h3>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {filteredPatients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => setSelectedId(patient.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                  selectedId === patient.id 
                  ? "bg-white border-blue-500 ring-2 ring-blue-100 shadow-md" 
                  : "bg-white border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  selectedId === patient.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                }`}>
                  <User size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm truncate uppercase">{patient.nombre}</p>
                  <p className="text-[10px] text-blue-600 font-medium">{patient.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FICHA DETALLADA */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[550px]">
            <div className="bg-[#F8FAFC] p-4 border-b border-gray-200">
              <h3 className="font-black text-gray-600 text-xs uppercase tracking-tighter">Ficha Estudiante</h3>
            </div>
            
            {selectedPatient ? (
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 pb-8 border-b border-gray-100">
                  <div className="w-32 h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">
                    <User size={64} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-black text-gray-800 uppercase">{selectedPatient.nombre}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <DetailStat label="Citas" value="03" icon={Calendar} color="text-orange-500" />
                      <DetailStat label="Fichas" value="01" icon={FileText} color="text-blue-500" />
                      <DetailStat label="Tareas" value="02" icon={Activity} color="text-green-500" />
                      <DetailStat label="Test" value="01" icon={ClipboardList} color="text-purple-500" />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex border border-gray-300 rounded-xl overflow-hidden bg-gray-50 shadow-inner">
                    {['Citas', 'Ficha Médica', 'Actividades', 'Resultados Test'].map((tab) => (
                      <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-[10px] font-black uppercase border-r last:border-r-0 border-gray-300 transition-colors ${
                          activeTab === tab ? "bg-white text-blue-600" : "text-gray-600 hover:bg-white"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 p-12 border-2 border-dotted border-gray-100 rounded-2xl text-center">
                    {/* CORRECCIÓN: Aquí usamos activeTab en lugar de tabActual */}
                    <p className="text-gray-400 italic text-sm">Mostrando información de: {activeTab}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-gray-400">
                <User size={48} className="mb-4 opacity-10" />
                <p className="italic text-sm">Selecciona un estudiante de la lista</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// CORRECCIÓN: Interfaz para evitar el 'any' en el icono
interface DetailStatProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

function DetailStat({ label, value, icon: Icon, color }: DetailStatProps) {
  return (
    <div className="bg-white border border-gray-100 p-2 rounded-lg shadow-sm flex items-center gap-2">
      <Icon size={14} className={color} />
      <div className="flex flex-col">
        <span className="text-[8px] font-black text-gray-400 uppercase leading-none">{label}</span>
        <span className="text-xs font-black text-gray-800">{value}</span>
      </div>
    </div>
  );
}