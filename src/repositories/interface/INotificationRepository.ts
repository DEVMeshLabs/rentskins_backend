import { Prisma, Notification } from "@prisma/client";

export interface INotificationRepository {
  create(data: Prisma.NotificationCreateManyInput): Promise<Notification>;
  findByMany(): Promise<Notification[]>;
  findByUser(owner_id: string): Promise<Notification | null>;
  findById(id: string): Promise<Notification | null>;
  updateNotification(): Promise<any>;
  delete(id: string): Promise<Notification>;
}
