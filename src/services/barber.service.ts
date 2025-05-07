import { db } from '@/database';

export async function listBarbers() {
  return [
    {
      id: 1,
      name: "John Doe",
    },
  ];
}

export async function createBarber(name: string, document: string, specialities: string[]) {
  const specialitiesIds = await db.specialty.findMany({
    where: {
      label: {
        in: specialities,
      },
    },
  });


  const barber = await db.barber.create({
    data: {
      name,
      document,
      specialities: {
        create: specialities.map((speciality) => ({
          specialty: {
            connect: { id: speciality },
          },
        })),
      },
    },
  });

  return barber;
}
