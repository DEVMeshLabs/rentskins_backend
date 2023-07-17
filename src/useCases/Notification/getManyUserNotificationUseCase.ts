import { INotificationRepository } from "@/repositories/interface/INotificationRepository";
import { DataFilter } from "@/utils/dataFilterDay";
import { Notification } from "@prisma/client";

export class GetManySkinNotification {
  constructor(private notification: INotificationRepository) {}
  async execute(owner_id: string, tempo: string): Promise<Notification[]> {
    const getManySkinNotification =
      await this.notification.findManySkinNotifications(owner_id);

    const filtrando = {
      tudo: () => getManySkinNotification,
      hoje: () => DataFilter.filterHoje(getManySkinNotification),
      tree: () => DataFilter.filterGeral(getManySkinNotification, 3),
      semana: () => DataFilter.filterGeral(getManySkinNotification, 7),
      mes: () => DataFilter.filterGeral(getManySkinNotification, 30),
      treemes: () => DataFilter.filterGeral(getManySkinNotification, 90),
      ano: () => DataFilter.filterGeral(getManySkinNotification, 365),
    };

    return filtrando[tempo]();
  }
}
