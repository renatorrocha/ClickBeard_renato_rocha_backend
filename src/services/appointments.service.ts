import { db } from '@/database';
import type { Context } from 'elysia';
import type { appointmentModelType } from '@/models/appointment';

export async function listAppointments() {
  const appointments = await db.appointment.findMany({
    include: {
      user: true,
      barber: true,
      specialty: true,
    },
  });


  return appointments;
}

export async function listAppointmentsByUser(userId: string) {
  const appointments = await db.appointment.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      barber: true,
      specialty: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return appointments;
}

export async function createAppointment(appointment: appointmentModelType, set: Context["set"]) {


  const newAppointment = await db.appointment.create({
    data: appointment,
  });

  return newAppointment;
}

export async function cancelAppointment(appointmentId: string) {
  const appointment = await db.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      canceledAt: new Date(),
    },
  });

  return appointment;
}