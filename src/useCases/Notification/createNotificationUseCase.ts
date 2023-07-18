import { INotificationRepository } from "@/repositories/interface/INotificationRepository";
import { Notification } from "@prisma/client";

interface NotificationRequest {
  owner_name: string;
  owner_id: string;
  description: string;
  skin_id?: string;
}

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
