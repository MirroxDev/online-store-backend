import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

async function main() {
  // Создаем страны
  await prisma.countries.create({
    data: {
      country_code: 'ua',
      name: 'Украина',
      name_ua: 'Україна',
      name_ru: 'Украина',
      name_en: 'Ukraine',
      name_de: 'Ukraine',
      name_pl: 'Ukraina',
    },
  });


  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });