import { Prisma, Notification } from "@prisma/client";

export interface INotificationRepository {
  create(data: Prisma.NotificationCreateManyInput): Promise<Notification>;
  findByMany(): Promise<Notification[]>;
  findByUser(owner_id: string): Promise<Notification | null>;
  findById(id: string): Promise<Notification | null>;
  updateNotification(owner_id: string): Promise<any>;
  findManySkinNotifications(owner_id: string): Promise<Notification[]>;
  delete(id: string): Promise<Notification>;
}
