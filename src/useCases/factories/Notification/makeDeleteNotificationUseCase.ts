import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { DeleteNotificationUseCase } from "@/useCases/Notification/deleteNotificationUseCase";

export function makeDeleteNotificationUseCase() {
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const deleteNotificationUseCase = new DeleteNotificationUseCase(
    prismaNotificationRepository
  );

  return deleteNotificationUseCase;
}
