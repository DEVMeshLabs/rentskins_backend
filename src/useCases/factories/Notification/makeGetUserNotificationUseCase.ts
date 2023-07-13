import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { GetUserNotificationUseCase } from "@/useCases/Notification/getUserNotificationUseCase";

export function makeGetUserNotificationUseCase() {
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const getUserNotificationUseCase = new GetUserNotificationUseCase(
    prismaNotificationRepository
  );

  return getUserNotificationUseCase;
}
