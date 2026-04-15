import { Pool } from 'pg';

/**
 * INSTRUCCIONES:
 * 
 * 1. Copia este archivo y renómbralo a: db.ts
 * 2. Cambia el puerto según tu configuración local:
 *    - Puerto por defecto PostgreSQL: 5432
 *    - Si tu compañero usa otro puerto: 5433
 * 3. Asegúrate de que las credenciales coincidan con tu BD local
 * 
 * Este archivo NO será subido a Git (está en .gitignore)
 * Cada developer tiene su propia configuración local
 */

const pool = new Pool({
  // OPCIÓN 1: Usar .env.local (RECOMENDADO)
  connectionString: process.env.DATABASE_URL || `postgresql://postgres:${process.env.DB_PASSWORD}@localhost:5432/sga_espe`,
  
  // OPCIÓN 2: Configuración directa (si .env.local no funciona)
  // connectionString: 'postgresql://postgres:TuContraseña@localhost:5432/mindpeace_db'
  
  // ⚠️ IMPORTANTE: CAMBIAR PUERTO SI ES NECESARIO
  // Tu puerto: 5432
  // Puerto compañero: 5433
});

export default pool;
