import { Perfil } from "@prisma/client";

export async function calculateReliability(user: Perfil) {
  if (user.delivery_time === "Sem informações") {
    return;
  }

  if (user.delivery_time !== undefined) {
    const [hora, minutos, segundos] = user.delivery_time.split(":");
    const totalSegundos =
      Number(hora) * 3600 + Number(minutos) * 60 + Number(segundos);

    let hoursDifference = Math.ceil((86400 - Number(totalSegundos)) / 3600);

    if (hoursDifference <= 0) {
      hoursDifference = 0;
    }

    const timePercentage = Number(((hoursDifference / 24) * 100).toFixed(2));

    const deliveryPercentage = (
      (user.total_exchanges_completed /
        (user.total_exchanges_failed + user.total_exchanges_completed)) *
      100
    ).toFixed(2);

    let reliabilityPercentage =
      Number(deliveryPercentage) * (3 / 4) + Number(timePercentage) * (1 / 4);

    if (reliabilityPercentage > 100) {
      reliabilityPercentage = 100;
    } else if (reliabilityPercentage < 0) {
      reliabilityPercentage = 0;
    }

    return reliabilityPercentage.toFixed(2);
  }
}
