// src/app/api/auth/psychologists/route.ts
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import db from '@/infrastructure/database/db';

export async function GET(request: Request) {
  try {
    // Obtener los psicólogos de la base de datos
    const psychologists = await db.query(
      'SELECT id, name, email FROM users WHERE role = $1',
      ['PSICOLOGO']
    );

    return NextResponse.json(
      psychologists.rows.map(p => ({
        id: p.id,
        name: p.name,
        email: p.email
      }))
    );
  } catch (error) {
    console.error('Error fetching psychologists:', error);
    return NextResponse.json(
      { error: 'Error al obtener psicólogos' },
      { status: 500 }
    );
  }
}
