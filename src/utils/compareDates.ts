// comparar data, horas e minutos e retorna true se for igual e false se for diferente

export function compareDates(date1: Date, date2: Date) {
  console.log("Dateeeeeeeeeeeeeee--------", date1.getTime() <= date2.getTime());
  console.log("Date 1", date1);
  console.log("Date 2 - new Date", date2);

  return date1.getTime() <= date2.getTime();
}

export function addHours() {
  const hours = 1;
  return new Date(new Date().setHours(new Date().getHours() + hours));
}