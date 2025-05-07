import { db } from '@/database';
import { Context } from 'elysia';
import { appointmentModelType } from '@/models/appointment';

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

export async function createAppointment(appointment: appointmentModelType, set: Context["set"]) {


  const newAppointment = await db.appointment.create({
    data: appointment,
  });

  return newAppointment;
}