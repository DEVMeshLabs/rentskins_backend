import { Prisma, Notification } from "@prisma/client";

export interface INotificationRepository {
  create(data: Prisma.NotificationCreateManyInput): Promise<Notification>;
  createMany(data: Prisma.NotificationCreateManyInput[]): Promise<any>;
  findByMany(): Promise<Notification[]>;
  findByUser(owner_id: string): Promise<Notification | null>;
  findById(id: string): Promise<Notification | null>;
  findManyUserNotifications(
    owner_id: string,
    page: number,
    pageSize: number
  ): Promise<Notification[]>;
  updateNotification(owner_id: string): Promise<any>;
  delete(id: string): Promise<Notification>;
}
