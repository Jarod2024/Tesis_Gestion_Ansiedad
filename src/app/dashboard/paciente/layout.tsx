import { PatientNavbar } from "@/presentation/components/patient/PatientNavbar";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0F7FF]">
      <PatientNavbar />
      <main className="p-8">{children}</main>
    </div>
  );
}