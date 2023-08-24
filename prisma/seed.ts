import { PrismaClient } from "@prisma/client";
import { seedSkin } from "../src/utils/seedSkin";

const prisma = new PrismaClient();

async function main() {
  await prisma.skin.deleteMany();

  await prisma.skin.createMany({
    data: seedSkin,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
