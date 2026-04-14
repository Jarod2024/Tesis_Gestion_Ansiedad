import pool from "@/infrastructure/database/db";
import { Activity } from "@/domain/dtos/activity.dto";

export class ActivityRepository {
  async getAllActivities(): Promise<Activity[]> {
    const client = await pool.connect();
    try {
      const res = await client.query(`
        SELECT id, nombre, categoria, duracion, usos, estado 
        FROM activities 
        ORDER BY nombre ASC
      `);
      return res.rows;
    } catch (error) {
      console.error("Error en ActivityRepository:", error);
      return [];
    } finally {
      client.release();
    }
  }
}