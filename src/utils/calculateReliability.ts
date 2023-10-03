export async function calculateReliability(user: any) {
  if (user.delivery_time === "Sem informações") {
    return "Sem informações";
  }

  const [hora, minutos, segundos] = user.delivery_time.split(":");

  const totalSegundos =
    Number(hora) * 3600 + Number(minutos) * 60 + Number(segundos);

  let hoursDifference = Math.ceil((86400 - Number(totalSegundos)) / 3600);

  if (hoursDifference <= 0) {
    hoursDifference = 0;
  }

  console.log(hoursDifference);

  const timePercentage = Number(((hoursDifference / 24) * 100).toFixed(2));

  const deliveryPercentage = (
    (user.total_exchanges_completed / user.total_exchanges) *
    100
  ).toFixed(2);

  const reliabilityPercentage = (
    Number(deliveryPercentage) * (3 / 4) +
    Number(timePercentage) * (1 / 4)
  ).toFixed(2);

  return reliabilityPercentage;
}
