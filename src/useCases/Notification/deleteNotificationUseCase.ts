import { INotificationRepository } from "@/repositories/interface/INotificationRepository";
import { Notification } from "@prisma/client";
import { NotificationNotExistError } from "../errors/Notification/NotificationNotExistError";

export class DeleteNotificationUseCase {
  constructor(private notification: INotificationRepository) {}
  async execute(id: string): Promise<Notification> {
    const findId = await this.notification.findById(id);

    if (!findId) {
      throw new NotificationNotExistError();
    }

    const deleteId = await this.notification.delete(id);

    return deleteId;
  }
}
