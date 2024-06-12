import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 创建用户
  const user1 = await prisma.user.create({
    data: {
      username: 'luyaUser1',
      phone: '1234567890',
      email: 'luyaUser1@example.com',
      avatar: 'https://example.com/avatar1.png',
      password: 'password123',
    },
  });

  console.log('Seed data created successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
