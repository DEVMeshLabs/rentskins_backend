import dayjs from "dayjs";

export function getTratarDateRental(end_date: string, before: boolean) {
  let endDateRental: string;

  if (before) {
    endDateRental = dayjs(end_date).subtract(1, "day").format();
  } else {
    endDateRental = dayjs(end_date).format();
  }

  const splitando = endDateRental.split("T");
  const [ano, mes, dia] = splitando[0].split("-");
  const [horas, minutos, tratarSecundos] = splitando[1].split(":");
  const secundos = tratarSecundos.split("-")[0];

  const dateObject = {
    horas,
    minutos,
    secundos,
    dia,
    mes,
    ano,
  };

  return dateObject;
}
