import { PsychologistNavbar } from "@/presentation/components/psychologist/PsychologistNavbar";

export default function PsychologistLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      {/* El Navbar del psicólogo con su propia navegación */}
      <PsychologistNavbar />
      <main className="p-8 flex-1">
        {children}
      </main>
    </div>
  );
}