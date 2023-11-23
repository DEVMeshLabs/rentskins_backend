import { Transaction } from "@prisma/client";
import dayjs from "dayjs";

export class MediaDates {
  segundosParaHorario(segundos: number): string {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    return `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundosRestantes
      .toFixed(0)
      .toString()
      .padStart(2, "0")}`;
  }

  horarioParaSegundos(horario: string): number {
    const [horas, minutos, segundos] = horario.split(":").map(Number);
    return horas * 3600 + minutos * 60 + segundos;
  }

  calcularMediaHorarios(horarios: string[]): string {
    const segundosHorarios = horarios.map(this.horarioParaSegundos);
    const somaSegundos = segundosHorarios.reduce(
      (total, segundos) => total + segundos,
      0
    );
    const mediaSegundos = somaSegundos / horarios.length;
    return this.segundosParaHorario(mediaSegundos);
  }

  /**
   * Calculates the difference between dates in the given array and returns the average time in the format "HH:mm:ss".
   *
   * @param {Transaction[]} arrayDeDatas - An array of Transaction objects containing createdAt and salesAt properties in the format "DD/MM/YYYY HH:mm:ss".
   * @return {Promise<string>} A Promise that resolves to a string representing the average time in the format "HH:mm:ss".
   */

  async calcularDiferenciaDates(arrayDeDatas: Transaction[]): Promise<string> {
    if (arrayDeDatas.length === 0) {
      return "Sem informações";
    }

    const dates = arrayDeDatas.map((item) => {
      const formato = "DD/MM/YYYY HH:mm:ss";
      const dateCreated = dayjs(item.createdAt, formato);
      const dateSalesAt = dayjs(item.salesAt, formato);
      const diferenca = dateSalesAt.diff(dateCreated, "second");

      const horas = Math.floor(diferenca / 3600);
      const minutos = Math.floor((diferenca % 3600) / 60);
      const segundos = Math.floor(diferenca % 60).toFixed(0);
      const media = `${horas}:${minutos}:${segundos}`;

      return media;
    });

    const response = this.calcularMediaHorarios(dates);
    return response;
  }
}
