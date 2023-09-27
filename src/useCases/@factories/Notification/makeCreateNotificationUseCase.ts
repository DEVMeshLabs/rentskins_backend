import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { CreateNotificationUseCase } from "@/useCases/Configuration/Notification/createNotificationUseCase";

export function makeCreateNotificationUseCase() {
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const prismaSkinsRepository = new PrismaSkinRepository();
  const createNotificationUseCase = new CreateNotificationUseCase(
    prismaNotificationRepository,
    prismaSkinsRepository
  );

  return createNotificationUseCase;
}
