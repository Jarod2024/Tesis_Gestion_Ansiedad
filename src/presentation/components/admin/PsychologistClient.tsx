'use client'

import { useState } from "react";
import { Search, Edit2, Trash2 } from "lucide-react";
import { Psychologist } from "@/domain/dtos/psychologist.dto";
import { deletePsychologistAction } from "@/infrastructure/actions/psychologist.actions";
import { CreatePsychologistModal } from "./CreatePsychologistModal";
// 1. Importamos el modal de edición
import { EditPsychologistModal } from "./EditPsychologistModal";

interface Props { initialData: Psychologist[]; }

export function PsychologistClient({ initialData }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [psychologists, setPsychologists] = useState(initialData);
  
  // 2. Estados para los Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);

  // Lógica de filtrado
  const filteredData = psychologists.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    // Nota: Usamos 'estado' o 'status' según tu DTO
    const matchesFilter = filter === "Todos" || doc.estado === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este psicólogo?")) {
      await deletePsychologistAction(id);
      setPsychologists(prev => prev.filter(p => p.id !== id));
    }
  };

  // 3. Función para abrir el modal de edición con los datos del doc
  const handleEdit = (doc: Psychologist) => {
    setSelectedPsychologist(doc);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Modales */}
      <CreatePsychologistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <EditPsychologistModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPsychologist(null);
        }} 
        psychologist={selectedPsychologist}
      />

      {/* Encabezado */}
      <div className="bg-[#D1E7FF] p-6 rounded-xl border border-blue-200">
        <h1 className="text-xl font-bold text-gray-900 uppercase">GESTIÓN DE PSICÓLOGOS</h1>
        <p className="text-sm text-gray-700">Gestión total de los psicólogos</p>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="mt-5 bg-white hover:bg-gray-100 text-gray-900 border-2 border-gray-400 px-6 py-2 rounded-xl text-sm font-black shadow-sm transition-transform active:scale-95"
        >
          Nuevo Doctor
        </button>
      </div>

      {/* Buscador y Filtros */}
      <div className="bg-[#D1E7FF]/50 p-6 rounded-xl border border-blue-100 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-400 focus:outline-none text-gray-900 shadow-inner"
            />
          </div>
          <button className="bg-gray-200 px-8 py-2 rounded-lg font-bold text-gray-800 border border-gray-400 hover:bg-gray-300">
            Buscar
          </button>
        </div>

        <div className="flex gap-2">
          {['Todos', 'Activo', 'Inactivo', 'Pendiente'].map((f) => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={`px-4 py-1 border border-gray-400 rounded-md text-xs font-medium transition-colors ${
                filter === f ? "bg-gray-800 text-white" : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {f === 'Activo' ? 'Activos' : f === 'Inactivo' ? 'Inactivos' : f}
            </button>
          ))}
        </div>

        {/* Tabla */}
        <div className="border-2 border-gray-800 rounded-xl overflow-hidden shadow-lg bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#BDBDBD] border-b-2 border-gray-800 font-black text-gray-900">
              <tr>
                <th className="px-4 py-4 border-r-2 border-gray-800 text-center uppercase">Nombre</th>
                <th className="px-4 py-4 border-r-2 border-gray-800 text-center uppercase">Email</th>
                <th className="px-4 py-4 border-r-2 border-gray-800 text-center uppercase">Contacto</th>
                <th className="px-4 py-4 border-r-2 border-gray-800 text-center uppercase">Especialidad</th>
                <th className="px-4 py-4 border-r-2 border-gray-800 text-center uppercase">Estado</th>
                <th className="px-4 py-4 text-center uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-200">
              {filteredData.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-100 transition-colors">
                  <td className="px-4 py-4 border-r-2 border-gray-200 text-gray-900 font-medium">{doc.name}</td>
                  <td className="px-4 py-4 border-r-2 border-gray-200 text-gray-900">{doc.email}</td>
                  <td className="px-4 py-4 border-r-2 border-gray-200 text-gray-900">{doc.contacto}</td>
                  <td className="px-4 py-4 border-r-2 border-gray-200 text-gray-900">{doc.especialidad}</td>
                  <td className="px-4 py-4 border-r-2 border-gray-200 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      doc.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {doc.estado}
                    </span>
                  </td>
                  <td className="px-4 py-4 flex justify-center gap-3">
                    <button className="bg-white border-2 border-gray-800 px-3 py-1 rounded-lg text-[10px] font-black text-gray-900 hover:bg-gray-800 hover:text-white transition-all uppercase">
                      Activar / Desactivar
                    </button>
                    {/* 4. Conectamos el botón de editar */}
                    <button 
                      onClick={() => handleEdit(doc)} 
                      className="text-gray-800 hover:text-blue-600 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(doc.id)} 
                      className="text-gray-800 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="p-8 text-center text-gray-500 font-bold">No se encontraron resultados</div>
          )}
        </div>
      </div>
    </div>
  );
}