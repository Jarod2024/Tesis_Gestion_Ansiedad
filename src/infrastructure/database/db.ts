import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://postgres:${process.env.DB_PASSWORD}@localhost:5432/sga_espe`,
});

export default pool;