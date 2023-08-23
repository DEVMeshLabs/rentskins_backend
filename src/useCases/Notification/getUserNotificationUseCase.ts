import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { Notification } from "@prisma/client";

export class GetUserNotificationUseCase {
  constructor(private notification: INotificationRepository) {}
  async execute(owner_id: string): Promise<Notification> {
    const getUser = await this.notification.findByUser(owner_id);

    if (!getUser) {
      return null;
    }

    return getUser;
  }
}
