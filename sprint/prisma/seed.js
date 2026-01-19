import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Amulya",
      email: "amulya@example.com",
      projects: {
        create: {
          name: "Crafts from Roots",
          tasks: {
            create: [
              { title: "Design DB Schema", status: "DONE" },
              { title: "Write Prisma Models", status: "IN_PROGRESS" }
            ]
          }
        }
      }
    }
  });
}

main().finally(() => prisma.$disconnect());
