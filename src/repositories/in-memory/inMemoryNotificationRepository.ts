import { Prisma, Notification } from "@prisma/client";
import { INotificationRepository } from "../interfaceRepository/INotificationRepository";
import { randomUUID } from "crypto";

export class InMemoryNotificationRepository implements INotificationRepository {
  public notifications: Notification[] = [];
  private notImplemented(): Promise<any> {
    return Promise.resolve(null);
  }

  async create(data: Prisma.NotificationCreateManyInput) {
    const createNotification = {
      id: data.owner_id ?? randomUUID(),
      owner_id: data.owner_id,
      description: data.description,
      skin_id: data.skin_id,
      new: true,
      type: data.type ?? null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,

      rentalTransactionId: data.rentalTransactionId ?? null,
    };

    this.notifications.push(createNotification);
    return createNotification;
  }

  async createMany(data: Prisma.NotificationCreateManyInput[]) {
    const createMany = data.map((notification) => {
      return this.create(notification);
    });
    return createMany;
  }

  findByMany() {
    return this.notImplemented();
  }

  findByUser(owner_id: string) {
    return this.notImplemented();
  }

  findById(id: string) {
    return this.notImplemented();
  }

  findManyUserNotifications(owner_id: string, page: number, pageSize: number) {
    return this.notImplemented();
  }

  updateNotification(owner_id: string): Promise<any> {
    return this.notImplemented();
  }

  delete(id: string) {
    return this.notImplemented();
  }
}
