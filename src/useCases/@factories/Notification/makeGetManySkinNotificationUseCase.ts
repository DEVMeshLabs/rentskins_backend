import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { GetManyUserNotification } from "@/useCases/Notification/getManyUserNotificationUseCase";

export function makeGetManyUserNotification() {
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const getNotificationUseCase = new GetManyUserNotification(
    prismaNotificationRepository
  );

  return getNotificationUseCase;
}
