import dayjs from "dayjs";

export function getTratarDateRental(end_date: string, before: boolean) {
  let endDateRental = dayjs(end_date);

  if (before) {
    endDateRental = endDateRental.subtract(12, "hours");
  }

  endDateRental = endDateRental.subtract(3, "hours");
  const formattedDate = endDateRental.format();

  const [ano, mes, dia, horas, minutos] = formattedDate
    .split(/[-T:]/)
    .map(Number);

  const response = new Date(ano, mes - 1, dia, horas, minutos);
  return response;
}
