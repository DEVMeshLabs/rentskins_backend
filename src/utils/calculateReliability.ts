import { Perfil } from "@prisma/client";

export async function calculateReliability(user: Perfil) {
  if (user.delivery_time === "Sem informações") {
    return;
  }

  if (user.delivery_time !== undefined) {
    const [hours, minutes, seconds] = user.delivery_time.split(":");

    const totalSeconds =
      Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

    let hoursDifference = Math.ceil((86400 - Number(totalSeconds)) / 3600);

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
