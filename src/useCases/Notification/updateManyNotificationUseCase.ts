import { INotificationRepository } from "@/repositories/interface/INotificationRepository";

export class UpdateManyNotificationUseCase {
  constructor(private notification: INotificationRepository) {}
  async execute(): Promise<any> {
    const updateMany = await this.notification.updateNotification();
    return updateMany;
  }
}
