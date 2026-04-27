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
  fecha: string;
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
  
  const [details, setDetails] = useState<PatientDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedPatient = patients.find(p => p.id === selectedId);
  
  const filteredPatients = patients.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchData() {
      if (!selectedId) return;
      setLoading(true);
      
      const res = await getDetailedPatientDataAction(selectedId);
      
      if (res.success && res.data) {
        setDetails(res.data);
      } else {
        setDetails(null);
      }
      
      setLoading(false);
    }
    fetchData();
  }, [selectedId]);

  return (
    <div className="space-y-6">
      {/* Buscador Mejorado */}
      <div className="bg-[#EEF2FF] p-4 rounded-xl border border-blue-100 flex gap-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-blue-500" size={20} />
          <input 
            type="text"
            placeholder="Buscar paciente por nombre..."
            className="w-full bg-transparent pl-11 pr-4 py-2 text-base text-slate-800 placeholder:text-slate-400 outline-none border-none font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LISTA DE PACIENTES */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-blue-600 p-4 rounded-t-xl shadow-md">
            <h3 className="text-white text-xs font-black uppercase tracking-widest text-center">
              Lista de Pacientes
            </h3>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200">
            {filteredPatients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => setSelectedId(patient.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                  selectedId === patient.id 
                  ? "bg-white border-blue-500 ring-2 ring-blue-100 shadow-md" 
                  : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  selectedId === patient.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                }`}>
                  <User size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-base truncate uppercase">{patient.nombre}</p>
                  <p className="text-xs text-blue-600 font-medium truncate mt-0.5">{patient.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FICHA DETALLADA */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[550px]">
            {selectedPatient ? (
              <div className="p-6 sm:p-8">
                {/* Header de la Ficha */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 pb-8 border-b border-gray-100 items-center md:items-start">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 flex-shrink-0">
                    <User size={48} className="md:w-16 md:h-16" />
                  </div>
                  <div className="flex-1 space-y-5 text-center md:text-left w-full">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-800 uppercase tracking-tight">
                      {selectedPatient.nombre}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                        className={`flex-1 py-3 px-2 text-xs md:text-sm font-black uppercase border-r last:border-r-0 border-gray-300 transition-colors ${
                          activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Contenido dinámico */}
                  <div className="mt-6">
                    {loading ? (
                      <div className="p-12 text-center animate-pulse text-gray-500 font-medium text-sm">
                        Obteniendo datos del paciente...
                      </div>
                    ) : (
                      <div className="space-y-4">
                        
                        {/* PESTAÑA: CITAS */}
                        {activeTab === 'Citas' && details?.appointments.map((app, i) => (
                          <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                            <div>
                              <p className="font-bold text-base uppercase text-gray-800 mb-1">{app.motivo}</p>
                              <p className="text-sm text-gray-500 font-medium">
                                {new Date(app.fecha).toLocaleDateString()} - {app.hora} <span className="text-gray-400">({app.modalidad})</span>
                              </p>
                            </div>
                            <span className="bg-blue-100 text-blue-700 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wide">
                              {app.estado}
                            </span>
                          </div>
                        ))}

                        {/* PESTAÑA: FICHA MÉDICA */}
                        {activeTab === 'Ficha Médica' && details?.medicalRecords.map((rec, i) => (
                          <div key={i} className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-xs font-black text-blue-700 uppercase bg-blue-100 px-3 py-1 rounded-md">
                                Nivel de Ansiedad: {rec.nivelansiedad}/10
                              </span>
                              <span className="text-sm text-gray-500 font-medium">
                                {new Date(rec.fecha).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-base text-gray-700 leading-relaxed">{rec.notas}</p>
                          </div>
                        ))}

                        {/* PESTAÑA: RESULTADOS TEST */}
                        {activeTab === 'Resultados Test' && (
                          <div className="space-y-4">
                            {details?.testResults && details.testResults.length > 0 ? (
                              details.testResults.map((test, index) => (
                                <div key={index} className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:border-blue-400 transition-colors">
                                  <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-black text-[#1E4D8C] uppercase text-sm">GAD-7: Ansiedad Generalizada</h4>
                                    <span className="text-sm text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded">
                                      {test.fecha ? new Date(test.fecha).toLocaleDateString() : 'Fecha no disponible'}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-3 items-center">
                                    <div className="bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
                                      <span className="text-xs font-bold text-slate-700">Puntaje: {test.puntaje}/21</span>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full text-white text-xs font-black uppercase shadow-sm ${
                                      test.puntaje >= 15 ? 'bg-red-500' : test.puntaje >= 10 ? 'bg-orange-500' : 'bg-green-500'
                                    }`}>
                                      {test.interpretation}
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center bg-gray-50 border border-dashed border-gray-200 rounded-xl py-12">
                                <p className="text-gray-500 font-medium text-sm">No hay tests registrados para este paciente.</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                    <p className="text-gray-500 text-xs font-medium">
                      Mostrando información de <span className="text-blue-600 font-bold uppercase">{activeTab}</span> para {selectedPatient.nombre.split(' ')[0]}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-gray-400 bg-gray-50/50">
                <User size={64} className="mb-4 text-gray-300" />
                <p className="font-medium text-base text-gray-500">Selecciona un estudiante de la lista lateral</p>
                <p className="text-sm text-gray-400 mt-1">Podrás ver sus citas, fichas y resultados de test.</p>
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
    <div className="bg-white border border-gray-200 p-3 rounded-xl shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
      <div className={`p-2 rounded-lg bg-gray-50 ${color}`}>
        <Icon size={18} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wide leading-none mb-1">{label}</span>
        <span className="text-sm font-black text-gray-800">{value}</span>
      </div>
    </div>
  );
}