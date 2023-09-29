import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { UpdateManyNotificationUseCase } from "@/useCases/Notification/updateManyNotificationUseCase";

export function makeUpdateManyNotificationUseCase() {
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const updateManyNotification = new UpdateManyNotificationUseCase(
    prismaNotificationRepository
  );

  return updateManyNotification;
}
