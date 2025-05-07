import { db } from '@/database';
import type { Context } from 'elysia';

export async function listBarbers(specialtyId?: string) {
  const barbers = await db.barber.findMany({
    where: specialtyId ? {
      specialties: {
        some: {
          specialtyId: specialtyId
        }
      }
    } : undefined,
    include: {
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });

  const barbersWithSpecialties = barbers.map((barber) => ({
    id: barber.id,
    name: barber.name,
    document: barber.document,
    specialties: barber.specialties.map((specialty) => ({
      id: specialty.specialty.id,
      label: specialty.specialty.label,
    })),
    createdAt: new Date(barber.createdAt).toISOString(),
  }));

  return barbersWithSpecialties;
}

export async function createBarber(barber: { name: string, document: string, specialties: string[] }, set: Context["set"]) {
  const { name, document, specialties } = barber;

  const existingBarber = await db.barber.findUnique({
    where: {
      document: document,
    },
  });

  if (existingBarber) {
    set.status = 400;
    throw new Error("barbeiro já cadastrado");
  }
  const newBarber = await db.barber.create({
    data: {
      name,
      document,
      specialties: {
        create: specialties.map((specialty) => ({
          specialty: {
            connect: { id: specialty },
          },
        })),
      },
    },
  });

  if (!newBarber) {
    set.status = 500;
    throw new Error("Erro ao criar barbeiro");
  }

  set.status = 201;
  return {
    id: newBarber.id,
    name: newBarber.name,
    document: newBarber.document,
  };
}

export async function deleteBarber(barberId: string) {
  await db.appointment.deleteMany({
    where: { barberId: barberId }
  });

  await db.barberSpecialty.deleteMany({
    where: { barberId: barberId }
  });

  const barber = await db.barber.delete({
    where: { id: barberId }
  });

  return barber;
}

export async function updateBarber(barberId: string, barber: { name: string, document: string, specialties: string[] }) {
  const { name, document, specialties } = barber;

  await db.barberSpecialty.deleteMany({
    where: { barberId: barberId }
  });

  const updatedBarber = await db.barber.update({
    where: { id: barberId },
    data: {
      name,
      document,
      specialties: {
        create: specialties.map((specialty) => ({
          specialty: {
            connect: { id: specialty },
          },
        })),
      },
    },
  });

  return updatedBarber;
}

export async function getBarber(barberId: string) {
  const barber = await db.barber.findUnique({
    where: { id: barberId },
    include: {
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });
  return barber;
}

export async function getBarberAppointments(barberId: string) {
  const appointments = await db.appointment.findMany({
    where: { barberId: barberId },
    include: {
      user: true,
      specialty: true,
    },
  });

  return appointments;
}

