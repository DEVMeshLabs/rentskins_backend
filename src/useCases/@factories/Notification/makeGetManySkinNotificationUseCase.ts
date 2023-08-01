import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { GetManySkinNotification } from "@/useCases/Notification/getManyUserNotificationUseCase";

export function makeGetManySkinNotification() {
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const getNotificationUseCase = new GetManySkinNotification(
    prismaNotificationRepository
  );

  return getNotificationUseCase;
}