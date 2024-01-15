/**
 * Generates an array of formatted date components based on the current date
 * and additional days, hours, minutes, and seconds provided.
 *
 * @param {number} additionalDays - The number of additional days to add to the current date (default: 0)
 * @param {number} additionalHours - The number of additional hours to add to the current date (default: 0)
 * @param {number} additionalMinutes - The number of additional minutes to add to the current date (default: 0)
 * @param {number} additionalSeconds - The number of additional seconds to add to the current date (default: 0)
 * @return {string[]} An array of formatted date components:
 *                     - seconds: The seconds component of the date
 *                     - minutes: The minutes component of the date
 *                     - hours: The hours component of the date
 *                     - dayOfMonth: The day of the month component of the date
 *                     - month: The month component of the date
 *                     - dayOfYear: The day of the year component of the date
 */

export function getFormattedDateArray(
  additionalSeconds: number = 0,
  additionalMinutes: number = 0,
  additionalHours: number = 0,
  additionalDays: number = 0
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
