// src/app/api/appointments/[id]/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/infrastructure/auth/auth.options';
import db from '@/infrastructure/database/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { status } = await request.json();

    if (!status || !['Pendiente', 'Aceptada', 'Rechazada'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Verificar que el psicólogo es el dueño de la cita
    const appointment = await db.query(
      'SELECT psychologist_id FROM appointments WHERE id = $1',
      [id]
    );

    if (appointment.rows.length === 0) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Convertir IDs a números para comparación
    const appointmentPsychologistId = Number(appointment.rows[0].psychologist_id);
    const sessionUserId = Number(session.user.id);
    
    console.log(`Checking permission: apt_psych_id=${appointmentPsychologistId} (type: ${typeof appointmentPsychologistId}), session_user_id=${sessionUserId} (type: ${typeof sessionUserId}), role=${session.user.role}`);
    
    if (appointmentPsychologistId !== sessionUserId && session.user.role !== 'ADMINISTRADOR') {
      console.log(`Forbidden: psych_id ${appointmentPsychologistId} !== user_id ${sessionUserId}`);
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const result = await db.query(
      'UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    const updated = result.rows[0];
    return NextResponse.json({
      id: updated.id,
      status: updated.status,
      message: 'Cita actualizada'
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Error al actualizar cita' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await db.query(
      `SELECT 
        id, 
        patient_id, 
        psychologist_id, 
        appointment_date, 
        appointment_time, 
        modality, 
        reason, 
        status
       FROM appointments 
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    const apt = result.rows[0];
    return NextResponse.json({
      id: apt.id,
      patientId: apt.patient_id,
      psychologistId: apt.psychologist_id,
      fecha: apt.appointment_date,
      hora: apt.appointment_time,
      modalidad: apt.modality,
      motivo: apt.reason,
      status: apt.status
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json(
      { error: 'Error al obtener cita' },
      { status: 500 }
    );
  }
}
