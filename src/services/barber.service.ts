import { db } from '@/database';
import { Context } from 'elysia';

export async function listBarbers() {
  const barbers = await db.barber.findMany({
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
