export function getFormattedDateArray(
  additionalDays: number = 0,
  additionalHours: number = 0,
  additionalMinutes: number = 0,
  additionalSeconds: number = 0
): string[] {
  const currentDate = new Date();

  // Adiciona dias, horas, minutos e segundos adicionais, se fornecidos
  currentDate.setDate(currentDate.getDate() + additionalDays);
  currentDate.setHours(currentDate.getHours() + additionalHours);
  currentDate.setMinutes(currentDate.getMinutes() + additionalMinutes);
  currentDate.setSeconds(currentDate.getSeconds() + additionalSeconds);

  // Obtém os componentes da data
  const seconds: string = String(currentDate.getSeconds()).padStart(2, "0");
  const minutes: string = String(currentDate.getMinutes()).padStart(2, "0");
  const hours: string = String(currentDate.getHours()).padStart(2, "0");
  const dayOfMonth: string = String(currentDate.getDate()).padStart(2, "0");
  const month: string = String(currentDate.getMonth() + 1).padStart(2, "0");
  const dayOfYear: string = String(getDayOfYear(currentDate)).padStart(3, "0");

  // Retorna um array de strings
  return [seconds, minutes, hours, dayOfMonth, month, dayOfYear];
}

// Função auxiliar para obter o dia do ano
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = +date - +start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}
