import { Prisma } from "@prisma/client";
import { INotificationRepository } from "../interfaceRepository/INotificationRepository";
import { prisma } from "@/lib/prisma";

export class PrismaNotificationRepository implements INotificationRepository {
  async updateNotification(owner_id: string) {
    const updateFull = await prisma.notification.updateMany({
      where: { owner_id, new: true },
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

  async createMany(data: Prisma.NotificationCreateInput) {
    const createNot = await prisma.notification.createMany({
      data,
    });
    return createNot;
  }

  async findByMany() {
    const findMany = await prisma.notification.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: { skin: true },
    });
    return findMany;
  }

  // take: pageSize,
  // orderBy: { createdAt: "desc" },
  // skip: (page - 1) * pageSize,

  async findManyUserNotifications(
    owner_id: string,
    page: number,
    pageSize: number
  ) {
    const findManySkin = await prisma.notification.findMany({
      where: {
        owner_id,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: { skin: true },
    });
    return findManySkin;
  }

  async findById(id: string) {
    const findId = await prisma.notification.findFirst({
      where: { id, deletedAt: null },
      include: { skin: true },
    });
    return findId;
  }

  async findByUser(owner_id: string) {
    const findMany = await prisma.notification.findFirst({
      where: { owner_id, deletedAt: null },
      include: { skin: true },
    });
    return findMany;
  }
}
