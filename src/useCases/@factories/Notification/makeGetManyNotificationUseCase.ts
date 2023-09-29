import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { GetManyNotificationUseCase } from "@/useCases/Notification/getManyNotificationUseCase";

export function makeGetManyNotificationUseCase() {
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const getManyNotificationUseCase = new GetManyNotificationUseCase(
    prismaNotificationRepository
  );

  return getManyNotificationUseCase;
}
