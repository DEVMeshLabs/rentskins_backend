import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { NotificationNotExistError } from "../../@errors/Notification/NotificationNotExistError";

export class UpdateManyNotificationUseCase {
  constructor(private notification: INotificationRepository) {}
  async execute(owner_id: string): Promise<any> {
    const getNot = await this.notification.findByUser(owner_id);

    if (!getNot) {
      throw new NotificationNotExistError();
    }

    const updateMany = await this.notification.updateNotification(owner_id);
    return updateMany;
  }
}
