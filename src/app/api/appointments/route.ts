// src/app/api/appointments/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/infrastructure/auth/auth.options';
import db from '@/infrastructure/database/db';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Debes estar autenticado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const psychologistId = searchParams.get('psychologistId');
    const patientId = searchParams.get('patientId');
    const fecha = searchParams.get('fecha');

    // Si se pasa psychologistId, obtener citas del psicólogo
    if (psychologistId) {
      const id = psychologistId || session.user.id;
      
      let query = `SELECT 
          a.id, 
          a.patient_id,
          a.psychologist_id,
          a.appointment_date,
          a.appointment_time,
          a.modality,
          a.reason as motivo,
          a.status,
          u.name as "patientName",
          u.email as "patientEmail"
         FROM appointments a
         JOIN users u ON a.patient_id = u.id
         WHERE a.psychologist_id = $1`;
      
      const params: any[] = [id];
      
      // Agregar filtro de fecha si se proporciona
      if (fecha) {
        query += ` AND a.appointment_date = $2`;
        params.push(fecha);
      }
      
      query += ` ORDER BY a.appointment_date DESC, a.appointment_time DESC`;
      
      const appointments = await db.query(query, params);

      return NextResponse.json(
        appointments.rows.map(apt => {
          // Convertir fecha a formato YYYY-MM-DD
          const fecha = typeof apt.appointment_date === 'string' 
            ? apt.appointment_date.split('T')[0]
            : new Date(apt.appointment_date).toISOString().split('T')[0];
          
          return {
            id: apt.id,
            patientId: apt.patient_id,
            psychologistId: apt.psychologist_id,
            fecha: fecha,
            hora: apt.appointment_time,
            modalidad: apt.modality,
            motivo: apt.motivo,
            status: apt.status,
            patientName: apt.patientName,
            patientEmail: apt.patientEmail
          };
        })
      );
    }

    // Si es paciente, obtener sus citas
    if (session.user.role === 'PACIENTE' || patientId) {
      const id = patientId || session.user.id;
      let query = `SELECT 
          a.id, 
          a.patient_id,
          a.psychologist_id,
          a.appointment_date,
          a.appointment_time,
          a.modality,
          a.reason as motivo,
          a.status,
          p.name as "psychologistName",
          p.email as "psychologistEmail"
         FROM appointments a
         JOIN users p ON a.psychologist_id = p.id
         WHERE a.patient_id = $1`;
      
      const params: any[] = [id];
      
      // Agregar filtro de fecha si se proporciona
      if (fecha) {
        query += ` AND a.appointment_date = $2`;
        params.push(fecha);
      }
      
      query += ` ORDER BY a.appointment_date DESC, a.appointment_time DESC`;
      
      const appointments = await db.query(query, params);

      return NextResponse.json(
        appointments.rows.map(apt => {
          // Convertir fecha a formato YYYY-MM-DD
          const fecha = typeof apt.appointment_date === 'string' 
            ? apt.appointment_date.split('T')[0]
            : new Date(apt.appointment_date).toISOString().split('T')[0];
          
          return {
            id: apt.id,
            patientId: apt.patient_id,
            psychologistId: apt.psychologist_id,
            fecha: fecha,
            hora: apt.appointment_time,
            modalidad: apt.modality,
            motivo: apt.motivo,
            status: apt.status,
            psychologistName: apt.psychologistName,
            psychologistEmail: apt.psychologistEmail
          };
        })
      );
    }

    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Error al obtener citas' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Debes estar autenticado para agendar citas' },
        { status: 401 }
      );
    }
    
    if (session.user.role !== 'PACIENTE') {
      return NextResponse.json(
        { error: 'Solo los pacientes pueden agendar citas' },
        { status: 403 }
      );
    }

    const { psychologistId, fecha, hora, modalidad, motivo } = await request.json();

    if (!psychologistId || !fecha || !hora || !modalidad) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: psicólogo, fecha, hora, modalidad' },
        { status: 400 }
      );
    }

    const result = await db.query(
      `INSERT INTO appointments (patient_id, psychologist_id, appointment_date, appointment_time, modality, reason, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       RETURNING id, patient_id, psychologist_id, appointment_date, appointment_time, modality, reason, status`,
      [session.user.id, psychologistId, fecha, hora, modalidad, motivo, 'Pendiente']
    );

    const appointment = result.rows[0];
    return NextResponse.json(
      {
        id: appointment.id,
        patientId: appointment.patient_id,
        psychologistId: appointment.psychologist_id,
        fecha: appointment.appointment_date,
        hora: appointment.appointment_time,
        modalidad: appointment.modality,
        motivo: appointment.reason,
        status: appointment.status
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Error al crear cita' },
      { status: 500 }
    );
  }
}
