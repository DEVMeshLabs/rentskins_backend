export function getTratarDateRental(end_date: Date, before: boolean) {
  const endDateRental = new Date(end_date.getTime());

  if (before) {
    const hoursBefore = 12;
    endDateRental.setHours(endDateRental.getHours() - hoursBefore);
  }

  const dateObject = {
    horas: endDateRental.getUTCHours(),
    minutos: endDateRental.getUTCMinutes(),
    secundos: endDateRental.getUTCSeconds(),
    dia: endDateRental.getDate(),
    mes: endDateRental.getMonth() + 1,
    ano: endDateRental.getFullYear(),
  };

  return dateObject;
}