import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { GetNotificationUseCase } from "@/useCases/Configuration/Notification/getNotificationUseCase";

export function makeGetNotificationUseCase() {
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const getNotificationUseCase = new GetNotificationUseCase(
    prismaNotificationRepository
  );

  return getNotificationUseCase;
}
