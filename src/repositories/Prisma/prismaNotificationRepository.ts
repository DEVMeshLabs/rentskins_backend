import { Prisma } from "@prisma/client";
import { INotificationRepository } from "../interface/INotificationRepository";
import { prisma } from "@/lib/prisma";

export class PrismaNotificationRepository implements INotificationRepository {
  async updateNotification() {
    const updateFull = await prisma.notification.updateMany({
      where: { new: true },
      data: { new: false, updatedAt: new Date() },
    });
    return updateFull;
  }

  async delete(id: string) {
    const deleteId = await prisma.notification.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return deleteId;
  }

  async create(data: Prisma.NotificationCreateInput) {
    const createNot = await prisma.notification.create({
      data,
    });
    return createNot;
  }

  async findByMany() {
    const findMany = await prisma.notification.findMany({
      where: { deletedAt: null },
    });
    return findMany;
  }

  async findById(id: string) {
    const findId = await prisma.notification.findFirst({
      where: { id, deletedAt: null },
    });
    return findId;
  }

  async findByUser(owner_id: string) {
    const findMany = await prisma.notification.findFirst({
      where: { owner_id, deletedAt: null },
    });
    return findMany;
  }
}
