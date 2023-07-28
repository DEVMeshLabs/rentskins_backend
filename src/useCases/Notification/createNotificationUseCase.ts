import { NotificationRequest } from "@/@types/INotificationRequest";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { Notification } from "@prisma/client";

export class CreateNotificationUseCase {
  constructor(private notification: INotificationRepository) {}
  async execute({
    owner_name,
    owner_id,
    description,
    skin_id,
  }: NotificationRequest): Promise<Notification> {
    const createNot = await this.notification.create({
      owner_name,
      owner_id,
      description,
      skin_id,
    });
    return createNot;
  }
}
