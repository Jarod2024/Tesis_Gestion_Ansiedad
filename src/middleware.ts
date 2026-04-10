// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = { 
  // Protege los dashboards pero EXCLUYE la API y archivos estáticos
  matcher: [
    "/dashboard/:path*",
    // Agrega aquí cualquier otra ruta privada
  ] 
};