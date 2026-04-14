'use client'

import { useState } from "react";
import { Activity } from "@/domain/dtos/activity.dto";
import { Search, Edit2, Eye, Trash2, Upload } from "lucide-react";

export function ActivityManagement({ initialActivities = [] }: { initialActivities: Activity[] }) {
  const [filter, setFilter] = useState('Todos');

  const categories = ['Todos', 'Respiración', 'Visualizacion', 'Sonidos'];

  return (
    <div className="p-6 bg-[#E3F2FD] min-h-screen space-y-6 font-sans">
      
      {/* Contenedor principal */}
      <div className="bg-[#D1E7FF] p-8 rounded-xl border border-blue-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-1">
          Gestión de Actividades
        </h2>
        <p className="text-sm text-gray-700 mb-6">
          Breve resumen de lo que hará este apartado de actividades
        </p>

        {/* Barra de Búsqueda */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-600" />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-400 text-sm focus:outline-none text-gray-900 bg-white"
            />
          </div>
          <button className="px-6 py-2 bg-gray-200 border border-gray-400 rounded-lg font-bold text-sm text-gray-800 hover:bg-gray-300 transition-colors">
            Buscar
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-1 rounded-full border border-gray-400 text-xs font-bold transition-all ${
                filter === cat 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tabla de Actividades */}
        <div className="overflow-hidden rounded-xl border-2 border-gray-800 bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#BDBDBD] border-b-2 border-gray-800 text-xs font-bold text-gray-900">
                <th className="p-3 border-r-2 border-gray-800">Nombre</th>
                <th className="p-3 border-r-2 border-gray-800">Categoría</th>
                <th className="p-3 border-r-2 border-gray-800">Duración</th>
                <th className="p-3 border-r-2 border-gray-800">Usos</th>
                <th className="p-3 border-r-2 border-gray-800">Estado</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>

            <tbody className="text-xs text-gray-900">
              {initialActivities.length > 0 ? (
                initialActivities.map((act) => (
                  <tr key={act.id} className="border-b border-gray-300 text-center hover:bg-gray-100 transition-colors">
                    <td className="p-3 border-r-2 border-gray-200">{act.nombre}</td>
                    <td className="p-3 border-r-2 border-gray-200">{act.categoria}</td>
                    <td className="p-3 border-r-2 border-gray-200">{act.duracion}</td>
                    <td className="p-3 border-r-2 border-gray-200">{act.usos}</td>
                    <td className="p-3 border-r-2 border-gray-200">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 font-bold text-[10px] uppercase">
                        {act.estado}
                      </span>
                    </td>
                    <td className="p-3 flex justify-center gap-4">
                      <Edit2 className="h-4 w-4 cursor-pointer text-gray-700 hover:text-blue-600" />
                      <Eye className="h-4 w-4 cursor-pointer text-gray-700 hover:text-green-600" />
                      <Trash2 className="h-4 w-4 cursor-pointer text-gray-700 hover:text-red-600" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500 font-bold">
                    No hay actividades registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botones Inferiores */}
      <div className="flex gap-6">
        <button className="flex-1 bg-[#D1E7FF] border border-gray-400 p-6 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-blue-200 transition-all group">
          <span className="font-bold uppercase text-sm text-gray-800">Importar Actividades</span>
          <Upload className="h-6 w-6 text-gray-700" />
        </button>
        <button className="flex-1 bg-[#D1E7FF] border border-gray-400 p-6 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-blue-200 transition-all group">
          <span className="font-bold uppercase text-sm text-gray-800">Ver Actividades</span>
          <Eye className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}