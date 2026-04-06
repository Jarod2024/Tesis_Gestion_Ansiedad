'use client'

import { useState } from "react";
import { ReportCard } from "./ReportCard";

// 1. Definimos la interfaz real para evitar el error 'any'
export interface UserData {
  id: string | number;
  name: string;
  email: string;
  contacto: string;
  status: string;
  role: string;
  fecha_registro: string;
}

interface ReportTableData {
  id: string | number;
  name: string;
  status: string;
  date: string;
}

export function ReportManagement({ allUsers = [] }: { allUsers: UserData[] }) {
  const [data, setData] = useState<ReportTableData[]>([]); 
  const [reportTitle, setReportTitle] = useState("");

  const handlePrint = (title: string, type: string) => {
    setReportTitle(title);

    // 2. Lógica de filtrado por tipo de reporte
    let filtered = [...allUsers];
    if (type === "psicologos") {
      filtered = allUsers.filter(u => u.role === 'PSICOLOGO');
    } else if (type === "pacientes") {
      filtered = allUsers.filter(u => u.role === 'ESTUDIANTE');
    }
    // Para 'general' o 'actividades' puedes mostrar todos o aplicar otra lógica

    // 3. Formateo de datos (Sin 'telefono' para evitar el error del servidor)
    const tableData = filtered.map(u => ({
      id: u.id,
      name: u.name,
      status: u.status || 'Activo',
      date: u.fecha_registro ? new Date(u.fecha_registro).toLocaleDateString() : 'N/A'
    }));

    setData(tableData);

    // 4. Disparo de impresión
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        globalThis.print();
      }
    }, 200);
  };

  const reportTypes = [
    { title: "Reporte General", type: "general", description: 'Estadísticas de todos los usuarios del sistema.', color: "bg-[#FFF0EA]" },
    { title: "Reporte de Psicólogos", type: "psicologos", description: 'Lista de especialistas y estado actual.', color: "bg-[#F3F0FF]" },
    { title: "Reporte de Pacientes", type: "pacientes", description: "Lista de estudiantes y nivel de actividad.", color: "bg-[#FFF9E5]" },
    { title: "Reporte de Actividades", type: "actividades", description: 'Resumen de herramientas más utilizadas.', color: "bg-[#E7F9ED]" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Interfaz de Pantalla */}
      <div className="bg-[#D1E7FF] p-5 rounded-xl border-2 border-gray-800 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">REPORTES</h1>
        <p className="text-xs font-bold text-gray-700 mt-0.5">
          Descripción: breve descripción del apartado de reportes lo que hace
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 print:hidden">
        {reportTypes.map((report, index) => (
          <ReportCard key={index} {...report} onPrint={() => handlePrint(report.title, report.type)} />
        ))}
      </div>

      {/* ESTRUCTURA DEL PDF MEJORADA */}
<div className="hidden print:block bg-white p-12 text-black min-h-screen font-sans">
  
  {/* Encabezado Institucional */}
  <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-8">
    <div className="space-y-1">
      <h1 className="text-4xl font-black tracking-tighter leading-none">MIND PEACE</h1>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-700">Sistema de Gestión Administrativa</p>
    </div>
    <div className="text-right">
      <h2 className="text-xl font-extrabold uppercase bg-black text-white px-3 py-1 inline-block">
        {reportTitle}
      </h2>
      <p className="text-[11px] font-medium mt-2">Fecha de emisión: {new Date().toLocaleDateString()}</p>
    </div>
  </div>

  {/* Tabla de Alta Legibilidad */}
  <table className="w-full border-collapse border-2 border-black">
    <thead>
      <tr className="bg-gray-100 border-b-2 border-black">
        <th className="border-r-2 border-black p-3 text-[11px] font-black uppercase text-left w-[30%]">Identificador (ID)</th>
        <th className="border-r-2 border-black p-3 text-[11px] font-black uppercase text-left w-[35%]">Nombre del Usuario</th>
        <th className="border-r-2 border-black p-3 text-[11px] font-black uppercase text-center w-[15%]">Estado</th>
        <th className="p-3 text-[11px] font-black uppercase text-right w-[20%]">F. Registro</th>
      </tr>
    </thead>
    <tbody className="text-[10px]">
      {data.length > 0 ? (
        data.map((item, index) => (
          <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="border-r-2 border-b border-black p-3 font-mono text-[9px] text-gray-600">
              {item.id}
            </td>
            <td className="border-r-2 border-b border-black p-3 font-bold uppercase text-[11px]">
              {item.name}
            </td>
            <td className="border-r-2 border-b border-black p-3 text-center">
              <span className={`px-2 py-1 rounded-full text-[9px] font-bold border ${
                item.status.toLowerCase() === 'activo' ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'
              }`}>
                {item.status}
              </span>
            </td>
            <td className="border-b border-black p-3 text-right font-medium">
              {item.date}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4} className="p-20 text-center text-gray-400 italic border-b border-black">
            No existen registros disponibles para este reporte.
          </td>
        </tr>
      )}
    </tbody>
  </table>

  {/* Pie de Página con Firmas (Estilo Universitario/Oficial) */}
  <div className="mt-20">
    <div className="grid grid-cols-2 gap-20 px-10">
      <div className="text-center">
        <div className="border-t-2 border-black pt-2">
          <p className="text-[10px] font-black uppercase">Firma del Administrador</p>
          <p className="text-[9px] text-gray-500">MindPeace Control Interno</p>
        </div>
      </div>
      <div className="text-center">
        <div className="border-t-2 border-black pt-2">
          <p className="text-[10px] font-black uppercase">Sello de Validación</p>
          <p className="text-[9px] text-gray-500">Departamento de Bienestar</p>
        </div>
      </div>
    </div>
    
    <div className="mt-16 text-center">
      <p className="text-[8px] text-gray-400 uppercase tracking-[0.2em]">
        *** Este documento es una representación digital válida de la base de datos de MindPeace ***
      </p>
    </div>
  </div>
</div>
    </div>
  );
}