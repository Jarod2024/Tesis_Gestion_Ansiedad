import { Pool } from 'pg';

const pool = new Pool({
  // Usando tus credenciales verificadas: puerto 5433 y clave 1234
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:1234@localhost:5433/sga_espe",
});

// Esta línea es la que falta y está causando el error
export default pool;