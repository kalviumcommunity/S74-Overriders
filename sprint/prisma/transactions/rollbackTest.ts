import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function rollbackTest() {
  try {
    await prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          name: 'Rollback Project',
          userId: 9999, // ❌ Invalid user → forces rollback
        },
      });

      await tx.task.create({
        data: {
          title: 'This should not exist',
          projectId: project.id,
        },
      });
    });
  } catch (error) {
    console.error('Rollback confirmed. No data saved.');
  } finally {
    await prisma.$disconnect();
  }
}

rollbackTest();
