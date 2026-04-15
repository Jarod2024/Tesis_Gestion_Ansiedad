import { PsychologistNavbar } from "@/presentation/components/psychologist/PsychologistNavbar";

export default function PsychologistLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]"> 
      {/* El Navbar del psicólogo con su propia navegación */}
      <PsychologistNavbar />
      <main className="p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}