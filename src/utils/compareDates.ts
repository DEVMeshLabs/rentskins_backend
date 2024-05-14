// comparar data, horas e minutos e retorna true se for igual e false se for diferente

export function compareDates(date1: Date, date2: Date) {
  return date1.getTime() <= date2.getTime();
}

export function addMinutes(minutes: number) {
  const newDate = new Date(
    new Date().setMinutes(new Date().getMinutes() + minutes)
  );
  return newDate;
}
