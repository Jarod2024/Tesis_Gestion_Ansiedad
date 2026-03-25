import { RegisterForm } from "@/presentation/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-emerald-50 p-6">
      <RegisterForm />
    </main>
  );
}