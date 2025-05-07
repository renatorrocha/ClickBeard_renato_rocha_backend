import { db } from './index';

async function seed() {
  try {
    const specialties = [
      { label: 'Corte de Cabelo' },
      { label: 'Barba' },
      { label: 'Corte + Barba' },
      { label: 'Sobrancelha' },
      { label: 'Corte + Sobrancelha' },
      { label: 'Hidratação' },
      { label: 'Coloração' },
    ];

    for (const specialty of specialties) {
      await db.specialties.upsert({
        where: { label: specialty.label },
        update: {},
        create: specialty,
      });
    }

    const adminUser = {
      name: 'admin',
      email: 'admin@admin.com',
      password: await Bun.password.hash('admin123'),
      role: 'ADMIN',
    };

    await db.user.upsert({
      where: { email: adminUser.email },
      update: {},
      create: adminUser,
    });

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('error:', error);
  } finally {
    await db.$disconnect();
  }
}

seed();