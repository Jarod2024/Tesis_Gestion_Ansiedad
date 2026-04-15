"use client";
import React from 'react';
import { Users, Calendar, CheckCircle, Eye, PlusCircle, LucideIcon } from 'lucide-react';
import { 
  PsychologistDashboardDTO, 
  AppointmentDTO, 
  ActivityDTO 
} from "@/domain/dtos/psychologist-dashboard.dto";

interface DashboardProps { 
  initialData: PsychologistDashboardDTO; 
}

export function PsychologistDashboard({ initialData }: DashboardProps) {
  const { stats, nextAppointments, recentActivities } = initialData;

  return (
    <main className="p-8 space-y-8 bg-white min-h-screen">
      {/* Banner Informativo */}
      <div className="bg-[#F3F8FF] p-4 rounded-lg border border-blue-100">
        <p className="text-blue-800 text-sm font-medium">
          Bienvenido al panel de control. Aquí puedes gestionar tus citas y actividades pendientes.
        </p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Pacientes" count={stats.totalPatients} color="bg-[#FFD1C1]" icon={Users} />
        <StatCard title="Citas Pendientes" count={stats.pendingAppointments} color="bg-[#D1FFD1]" icon={Calendar} />
        <StatCard title="Citas Aceptadas" count={stats.acceptedAppointments} color="bg-[#EBD1FF]" icon={CheckCircle} />
      </div>

      {/* Tablas de Gestión */}
      <div className="space-y-6">
  <DashboardTable<AppointmentDTO> 
    title="PRÓXIMAS CITAS" 
    columns={['HORA', 'Paciente', 'Tipo', 'Estado']} 
    data={nextAppointments.map(app => ({
      hora: app.hora,           // Coincide con AppointmentDTO
      paciente: app.paciente,   // Coincide con AppointmentDTO
      tipo: app.tipo,           // Coincide con AppointmentDTO
      estado: app.estado        // Coincide con AppointmentDTO
    }))}
  />
        <DashboardTable<ActivityDTO> 
  title="ACTIVIDADES RECIENTES" 
  columns={['Paciente', 'Actividad', 'Fecha Límite', 'Estado']} 
  data={recentActivities.map(act => ({
    paciente: act.paciente,
    actividad: act.actividad,
    fechaLimite: act.fechaLimite, // <-- Cambia "fecha" por "fechaLimite"
    estado: act.estado
  }))}
/>
</div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionButton title="VER PACIENTES" icon={Eye} color="bg-[#D1D1FF]" />
        <QuickActionButton title="ASIGNAR ACTIVIDADES" icon={PlusCircle} color="bg-[#FFD1FF]" />
        <QuickActionButton title="VER CITAS" icon={Eye} color="bg-[#D1D1FF]" />
      </div>
    </main>
  );
}

// --- COMPONENTES AUXILIARES CON CORRECCIONES ---

interface TableProps<T> {
  title: string;
  columns: string[];
  data: T[];
}

function DashboardTable<T extends object>({ title, columns, data }: TableProps<T>) {
  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-white">
      <div className="p-3 border-b border-gray-300 bg-gray-50">
        <h3 className="text-[11px] font-black text-gray-600 tracking-widest uppercase">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-center">
          <thead className="bg-[#D9D9D9] border-b border-gray-300">
            <tr>
              {columns.map((col) => (
                <th key={col} className="py-2.5 border-r last:border-r-0 border-gray-400 font-bold uppercase text-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr className="h-16">
                <td colSpan={columns.length} className="text-gray-400 italic bg-gray-50/50">
                  No hay registros disponibles actualmente.
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={idx} className="border-b last:border-b-0 hover:bg-blue-50/30 transition-colors">
                  {Object.values(item).map((val, i) => (
                    <td key={i} className="py-3.5 border-r last:border-r-0 border-gray-200 text-gray-700">
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  count: number;
  color: string;
  icon: LucideIcon; // Tipado correcto para iconos de Lucide
}

function StatCard({ title, count, color, icon: Icon }: StatCardProps) {
  return (
    <div className={`${color} p-6 rounded-xl border border-gray-200 flex flex-col items-center shadow-sm transition-transform hover:scale-[1.02]`}>
      <div className="flex items-center gap-3 font-black text-gray-800 text-2xl">
        <Icon size={24} className="text-gray-700" />
        <span>{count < 10 ? `0${count}` : count}</span>
      </div>
      <span className="text-[10px] font-bold uppercase mt-2 text-gray-600 tracking-wider">{title}</span>
    </div>
  );
}

interface ActionBtnProps {
  title: string;
  icon: LucideIcon;
  color: string;
}

function QuickActionButton({ title, icon: Icon, color }: ActionBtnProps) {
  return (
    <button className={`${color} p-8 rounded-2xl border border-gray-300 flex flex-col items-center gap-3 hover:brightness-95 transition-all shadow-md active:scale-95 group`}>
      <Icon size={32} className="text-gray-700 group-hover:scale-110 transition-transform" />
      <span className="font-black text-gray-800 text-[11px] uppercase tracking-tighter">{title}</span>
    </button>
  );
}