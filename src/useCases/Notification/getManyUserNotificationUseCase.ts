import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { DataFilter } from "@/useCases/Wallet/utils/dataFilterDay";
import { Notification } from "@prisma/client";

export class GetManyUserNotification {
  constructor(private notification: INotificationRepository) {}
  async execute(
    owner_id: string,
    tempo: string,
    page: number,
    pageSize: number
  ): Promise<Notification[]> {
    const getManySkinNotification =
      await this.notification.findManyUserNotifications(
        owner_id,
        page,
        pageSize
      );

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
