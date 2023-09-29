import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { Notification } from "@prisma/client";

export class GetManyNotificationUseCase {
  constructor(private notification: INotificationRepository) {}
  async execute(): Promise<Notification[]> {
    const getMany = await this.notification.findByMany();
    return getMany;
  }
}
