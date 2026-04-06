'use server'

import pool from "@/infrastructure/database/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt"; // Cambiado a bcryptjs para evitar errores de módulo

// 1. Interfaces específicas para evitar el error 'any'
interface CreatePsychologistData {
  name: string;
  email: string;
  password: string;
  especialidad: string;
  contacto: string;
}

interface UpdatePsychologistData {
  name: string;
  email: string;
  especialidad: string;
  contacto: string;
}

// --- ELIMINAR ---
export async function deletePsychologistAction(id: string) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM users WHERE id = $1', [id]);
    revalidatePath('/dashboard/admin/psicologos');
  } finally {
    client.release();
  }
}

// --- CREAR ---
export async function createPsychologistAction(formData: CreatePsychologistData) {
  const { name, email, password, especialidad, contacto } = formData;
  const client = await pool.connect();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query(
      `INSERT INTO users (name, email, password, role, status, especialidad, contacto) 
       VALUES ($1, $2, $3, 'PSICOLOGO', 'Activo', $4, $5)`,
      [name, email, hashedPassword, especialidad, contacto]
    );

    revalidatePath('/dashboard/admin/psicologos');
    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    console.error("Error al crear psicólogo:", errorMessage);
    return { success: false, error: errorMessage };
  } finally {
    client.release();
  }
}

// --- ACTUALIZAR (Corregido sin 'any') ---
export async function updatePsychologistAction(id: string, formData: UpdatePsychologistData) {
  const { name, email, especialidad, contacto } = formData;
  const client = await pool.connect();

  try {
    // Actualizamos los campos asegurando que las columnas existan
    await client.query(
      `UPDATE users 
       SET name = $1, email = $2, especialidad = $3, contacto = $4 
       WHERE id = $5`,
      [name, email, especialidad, contacto, id]
    );

    revalidatePath('/dashboard/admin/psicologos');
    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error al actualizar";
    console.error("Error al editar psicólogo:", errorMessage);
    return { success: false, error: errorMessage };
  } finally {
    client.release();
  }
}
export async function togglePsychologistStatusAction(id: string, currentStatus: string) {
  const client = await pool.connect();
  try {
    // Definimos el nuevo estado
    const newStatus = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';

    await client.query(
      'UPDATE users SET status = $1 WHERE id = $2 AND role = $3',
      [newStatus, id, 'PSICOLOGO']
    );

    return { success: true, newStatus };
  } catch (error: unknown) {
    console.error("Error al cambiar estado del psicólogo:", error);
    return { success: false, error: "No se pudo actualizar el estado" };
  } finally {
    client.release();
  }
}