"use client";
import React, { useState, useEffect } from 'react';
import { Search, User, Calendar, FileText, ClipboardList, LucideIcon } from 'lucide-react';
import { PatientListItemDTO } from "@/domain/dtos/patient-management.dto";
import { getDetailedPatientDataAction } from "@/infrastructure/actions/psicologo.patient.actions";

// --- INTERFACES DE DATOS ---
interface Appointment {
  fecha: string;
  hora: string;
  modalidad: string;
  motivo: string;
  estado: string;
}

interface MedicalRecord {
  fecha: string;
  nivelansiedad: number;
  notas: string;
}

interface TestResult {
  test: string;
  puntaje: number;
  interpretation: string;
}

interface PatientDetails {
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  testResults: TestResult[];
}

interface Props {
  patients: PatientListItemDTO[];
}

// --- COMPONENTE PRINCIPAL ---
export function PatientManager({ patients }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(patients[0]?.id || null);
  const [activeTab, setActiveTab] = useState("Citas");
  
  // Estado tipado correctamente para evitar el error "unexpected any"
  const [details, setDetails] = useState<PatientDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedPatient = patients.find(p => p.id === selectedId);
  
  const filteredPatients = patients.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cargar datos reales cuando cambia el paciente seleccionado
 // Cargar datos reales cuando cambia el paciente seleccionado
useEffect(() => {
  async function fetchData() {
    if (!selectedId) return;
    setLoading(true);
    
    const res = await getDetailedPatientDataAction(selectedId);
    console.log("Datos recibidos del paciente:", res.data);
    
    // Agregamos la validación 'res.data' para evitar el error de 'undefined'
    if (res.success && res.data) {
      setDetails(res.data);
    } else {
      setDetails(null); // Si no hay datos, limpiamos el estado
    }
    
    setLoading(false);
  }
  fetchData();
}, [selectedId]);

  return (
    <div className="space-y-6">
      {/* Buscador */}
      <div className="bg-[#EEF2FF] p-4 rounded-xl border border-blue-100 flex gap-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-blue-400" size={18} />
          <input 
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full bg-transparent pl-10 pr-4 py-1 text-sm outline-none border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LISTA DE PACIENTES (Columna Izquierda) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-blue-600 p-3 rounded-t-xl shadow-md">
            <h3 className="text-white text-[11px] font-black uppercase tracking-widest text-center">
              Lista de Pacientes
            </h3>
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
                  <p className="text-[10px] text-blue-600 font-medium truncate">{patient.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FICHA DETALLADA (Columna Derecha) */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[550px]">
            {selectedPatient ? (
              <div className="p-8">
                {/* Header de la Ficha */}
                <div className="flex flex-col md:flex-row gap-8 pb-8 border-b border-gray-100">
                  <div className="w-32 h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">
                    <User size={64} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-black text-gray-800 uppercase">
                      {selectedPatient.nombre}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <DetailStat label="Citas" value={details?.appointments?.length || 0} icon={Calendar} color="text-orange-500" />
                      <DetailStat label="Fichas" value={details?.medicalRecords?.length || 0} icon={FileText} color="text-blue-500" />
                      <DetailStat label="Test" value={details?.testResults?.length || 0} icon={ClipboardList} color="text-purple-500" />
                    </div>
                  </div>
                </div>

                {/* Navegación de Pestañas */}
                <div className="mt-8">
                  <div className="flex border border-gray-300 rounded-xl overflow-hidden bg-gray-50 shadow-inner">
                    {['Citas', 'Ficha Médica', 'Resultados Test'].map((tab) => (
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

                  {/* Contenido dinámico tipado */}
                  <div className="mt-6">
                    {loading ? (
                      <div className="p-12 text-center animate-pulse text-gray-400">Obteniendo datos...</div>
                    ) : (
                      <div className="space-y-4">
                        {activeTab === 'Citas' && details?.appointments.map((app: Appointment, i: number) => (
                          <div key={i} className="flex justify-between p-4 border rounded-xl hover:bg-gray-50">
                            <div>
                              <p className="font-bold text-sm uppercase text-gray-700">{app.motivo}</p>
                              <p className="text-[10px] text-gray-500">
                                {new Date(app.fecha).toLocaleDateString()} - {app.hora} ({app.modalidad})
                              </p>
                            </div>
                            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full h-fit uppercase">
                              {app.estado}
                            </span>
                          </div>
                        ))}

                        {activeTab === 'Ficha Médica' && details?.medicalRecords.map((rec: MedicalRecord, i: number) => (
                          <div key={i} className="p-4 bg-blue-50/30 border border-blue-100 rounded-xl">
                            <div className="flex justify-between mb-2">
                              <span className="text-[10px] font-black text-blue-600 uppercase">
                                Nivel de Ansiedad: {rec.nivelansiedad}/10
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {new Date(rec.fecha).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm italic text-gray-600">{rec.notas}</p>
                          </div>
                        ))}

                        {activeTab === 'Resultados Test' && details?.testResults.map((test: TestResult, i: number) => (
                          <div key={i} className="p-4 border rounded-xl border-purple-100 bg-purple-50/10">
                            <p className="font-black text-purple-700 text-xs uppercase">{test.test}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full" style={{ width: `${Math.min((test.puntaje / 50) * 100, 100)}%` }}></div>
                              </div>
                              <span className="text-xs font-bold text-gray-700">{test.puntaje} pts</span>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2 italic">{test.interpretation}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-4 border-t border-dotted text-center">
                    <p className="text-gray-400 italic text-[11px]">
                      Mostrando información de <span className="text-blue-500 font-bold">{activeTab}</span> para {selectedPatient.nombre.split(' ')[0]}
                    </p>
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

// --- SUB-COMPONENTE CON TIPADO ESTRICTO ---
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