import dayjs from "dayjs";

export function getTratarDateRental(end_date: string, before: boolean) {
  let endDateRental: string;
  if (before) {
    endDateRental = dayjs(end_date).subtract(12, "hours").format();
  } else {
    endDateRental = dayjs(end_date).format();
  }

  const splitando = endDateRental.split("T");
  const [ano, mes, dia] = splitando[0].split("-");
  const [horas, minutos] = splitando[1].split(":");
  // const secundos = tratarSecundos.split("-")[0];
  const mesNovo = Number(mes) - 1;
  // const dateObject = {
  //   endDateRental,
  //   horas,
  //   minutos,
  //   secundos,
  //   dia,
  //   mes,
  //   ano,
  // };
  const newDate = new Date(
    Number(ano),
    Number(mesNovo),
    Number(dia),
    Number(horas),
    Number(minutos)
  );
  console.log("AQUII", newDate);
  return newDate;
}
