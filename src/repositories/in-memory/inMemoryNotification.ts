// import { Prisma, Notification } from "@prisma/client";

// import { INotificationRepository } from "../interface/INotificationRepository";
// import { randomUUID } from "crypto";
// import { string, boolean } from "zod";

// export class inMemoryNotificationRepository implements INotificationRepository {
//   public items: Notification[] = [];

//   async findManySkinNotifications(
//     owner_id: string,
//     tempo: string
//   ): Promise<any[]> {
//     throw new Error("Method not implemented.");
//   }

//   async create(data: Prisma.NotificationCreateInput) {
//     const notification = {
//       id: randomUUID(),
//       owner_name: data.owner_name,
//       owner_id: data.owner_id,
//       description: data.description,
//       new: true,
//       createdAt: new Date(),
//     };
//     this.items.push(notification);
//     return notification;
//   }
//   // findByMany(): Promise<(GetResult<{ id: string; owner_name: string; owner_id: string; description: string; new: boolean; skin_id: string; createdAt: Date; updatedAt: Date; deletedAt: Date; }, unknown> & {})[]> {
//   //   throw new Error("Method not implemented.");
//   // }
//   // findByUser(owner_id: string): Promise<GetResult<{ id: string; owner_name: string; owner_id: string; description: string; new: boolean; skin_id: string; createdAt: Date; updatedAt: Date; deletedAt: Date; }, unknown> & {}> {
//   //   throw new Error("Method not implemented.");
//   // }
//   // findById(id: string): Promise<GetResult<{ id: string; owner_name: string; owner_id: string; description: string; new: boolean; skin_id: string; createdAt: Date; updatedAt: Date; deletedAt: Date; }, unknown> & {}> {
//   //   throw new Error("Method not implemented.");
//   // }

//   // updateNotification(): Promise<any> {
//   //   throw new Error("Method not implemented.");
//   // }
//   // delete(id: string): Promise<GetResult<{ id: string; owner_name: string; owner_id: string; description: string; new: boolean; skin_id: string; createdAt: Date; updatedAt: Date; deletedAt: Date; }, unknown> & {}> {
//   //   throw new Error("Method not implemented.");
//   // }
// }
