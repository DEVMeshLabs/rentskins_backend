import { INotificationRepository } from "@/repositories/interface/INotificationRepository";
import { Notification } from "@prisma/client";

export class GetManySkinNotification {
  constructor(private notification: INotificationRepository) {}
  async execute(owner_id: string, tempo: string): Promise<Notification[]> {
    const atual = new Date().toLocaleDateString();
    console.log(atual);

    const getManySkinNotification =
      await this.notification.findManySkinNotifications(owner_id);
    // console.log(getManySkinNotification);
    // if (tempo === "hoje") {
    //   const hojeFilter = getManySkinNotification.filter(
    //     (item) => item.createdAt.toLocaleDateString() === atual
    //   );
    //   return hojeFilter;
    // } else if (tempo === "tudo") {
    //   return getManySkinNotification;
    // } else if (tempo === "1 semana") {
    //   const semana = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    //   const filterSemana = getManySkinNotification.filter(
    //     (item) =>
    //       item.createdAt.toLocaleDateString() <= semana.toLocaleDateString() &&
    //       item.createdAt.toLocaleDateString() >= semana.toLocaleDateString()
    //   );
    //   return filterSemana;
    // }

    const filtrando = {
      hoje: () =>
        getManySkinNotification.filter(
          (item) => item.createdAt.toLocaleDateString() === atual
        ),
      tudo: () => getManySkinNotification,
      semana: () => {
        const semana = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        return getManySkinNotification.filter(
          (item) =>
            item.createdAt.toLocaleDateString() <=
              semana.toLocaleDateString() &&
            item.createdAt.toLocaleDateString() >= semana.toLocaleDateString()
        );
      },
      tree: () => {
        const treeDias = new Date(
          new Date().getTime() - 3 * 24 * 60 * 60 * 1000
        );
        console.log(new Date().getDate());
        return getManySkinNotification.filter(
          (item) =>
            item.createdAt.toLocaleDateString() <=
              treeDias.toLocaleDateString() &&
            item.createdAt.toLocaleDateString() >= treeDias.toLocaleDateString()
        );
      },
      mes: () => {
        const treeDias = new Date(
          new Date().getTime() - 30 * 24 * 60 * 60 * 1000
        );
        console.log(new Date().getDate());
        return getManySkinNotification.filter(
          (item) =>
            item.createdAt.toLocaleDateString() <=
              treeDias.toLocaleDateString() &&
            item.createdAt.toLocaleDateString() >= treeDias.toLocaleDateString()
        );
      },
      treemes: () => {
        const treeDias = new Date(
          new Date().getTime() - 90 * 24 * 60 * 60 * 1000
        );
        console.log(new Date().getDate());
        return getManySkinNotification.filter(
          (item) =>
            item.createdAt.toLocaleDateString() <=
              treeDias.toLocaleDateString() &&
            item.createdAt.toLocaleDateString() >= treeDias.toLocaleDateString()
        );
      },
      ano: () => {
        const treeDias = new Date(
          new Date().getTime() - 365 * 24 * 60 * 60 * 1000
        );
        console.log(new Date().getDate());
        return getManySkinNotification.filter(
          (item) =>
            item.createdAt.toLocaleDateString() <=
              treeDias.toLocaleDateString() &&
            item.createdAt.toLocaleDateString() >= treeDias.toLocaleDateString()
        );
      },
    };

    return filtrando[tempo]();
  }
}
