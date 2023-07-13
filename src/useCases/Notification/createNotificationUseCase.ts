import { INotificationRepository } from "@/repositories/interface/INotificationRepository";
import { Notification } from "@prisma/client";
import { NotificationAlreadyExistError } from "../errors/Notification/NotificationAlreadyExistError";

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
    const findUser = await this.notification.findByUser(owner_id);

    if (findUser) {
      throw new NotificationAlreadyExistError();
    }

    const createNot = await this.notification.create({
      owner_name,
      owner_id,
      description,
      skin_id,
    });
    return createNot;
  }
}
