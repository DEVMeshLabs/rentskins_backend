import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { CreateNotificationUseCase } from "@/useCases/Notification/createNotificationUseCase";

export function makeCreateNotificationUseCase() {
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const createNotificationUseCase = new CreateNotificationUseCase(
    prismaNotificationRepository
  );

  return createNotificationUseCase;
}
