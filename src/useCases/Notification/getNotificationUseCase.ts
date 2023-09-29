import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { Notification } from "@prisma/client";
import { NotificationNotExistError } from "../@errors/Notification/NotificationNotExistError";

export class GetNotificationUseCase {
  constructor(private notification: INotificationRepository) {}
  async execute(id: string): Promise<Notification> {
    const getNot = await this.notification.findById(id);

    if (!getNot) {
      throw new NotificationNotExistError();
    }

    return getNot;
  }
}
