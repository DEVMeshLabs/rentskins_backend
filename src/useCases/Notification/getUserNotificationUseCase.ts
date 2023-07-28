import { INotificationRepository } from "@/repositories/interface/INotificationRepository";
import { Notification } from "@prisma/client";
import { NotificationNotExistError } from "../@errors/Notification/NotificationNotExistError";

export class GetUserNotificationUseCase {
  constructor(private notification: INotificationRepository) {}
  async execute(owner_id: string): Promise<Notification> {
    const getUser = await this.notification.findByUser(owner_id);

    if (!getUser) {
      throw new NotificationNotExistError();
    }

    return getUser;
  }
}
