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
      tresDias: () => DataFilter.filterGeral(getManySkinNotification, 3),
      umaSemana: () => DataFilter.filterGeral(getManySkinNotification, 7),
      umMes: () => DataFilter.filterGeral(getManySkinNotification, 30),
      tresMes: () => DataFilter.filterGeral(getManySkinNotification, 90),
      umAno: () => DataFilter.filterGeral(getManySkinNotification, 365),
    };

    return filtrando[tempo]();
  }
}
