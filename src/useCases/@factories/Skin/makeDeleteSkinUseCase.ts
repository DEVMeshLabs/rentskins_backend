import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { DeleteSkinUseCase } from "@/useCases/Skin/deleteSkinUseCase";

export function makeDeleteSkinUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const getskinUseCase = new DeleteSkinUseCase(
    prismaSkinRepository,
    prismaNotificationRepository
  );

  return getskinUseCase;
}
