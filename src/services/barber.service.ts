import { db } from '@/database';
import { Context } from 'elysia';

export async function listBarbers() {
  return [
    {
      id: 1,
      name: "John Doe",
    },
  ];
}

export async function createBarber(name: string, document: string, specialties: string[]) {
  const barber = await db.barber.create({
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

  return barber;
}
