// comparar data, horas e minutos e retorna true se for igual e false se for diferente

export function compareDates(date1: Date, date2: Date) {
  return date1.getTime() <= date2.getTime();
}

export function addHours(hours: number) {
  const newDate = new Date(new Date().setHours(new Date().getHours() + hours));
  return newDate;
}
