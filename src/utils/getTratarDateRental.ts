import dayjs from "dayjs";

export function getTratarDateRental(end_date: string, before: boolean) {
  const endDateRental = before
    ? dayjs(end_date).subtract(12, "hours").format()
    : dayjs(end_date).format();

  const [ano, mes, dia, horas, minutos] = endDateRental
    .split(/[-T:]/)
    .map(Number);
  const mesNovo = mes - 1;

  return new Date(ano, mesNovo, dia, horas, minutos);
}
