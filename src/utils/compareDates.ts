// comparar 2 datas e retorna true se for igual e false se for diferente

export function compareDates(date1: Date, date2: Date) {
  if (date1.getTime() === date2.getTime()) {
    return true;
  }

  return false;
}

export function addHours() {
  const hours = 1;
  return new Date(new Date().setHours(new Date().getHours() + hours));
}
