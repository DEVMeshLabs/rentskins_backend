const atual = new Date();
const dateAtual = new Date(atual.setHours(0, 0, 0, 0));

export class DataFilter {
  public static filterHoje(array: any) {
    const filter = array.filter(
      (item: any) => item.createdAt.toLocaleDateString() === atual
    );
    return filter;
  }

  public static filterGeral(array: any, dias: number) {
    const fil = new Date(new Date().setDate(new Date().getDate() - dias));
    const filMenosHouras = new Date(fil.setHours(0, 0, 0, 0));

    return array.filter((item: any) => {
      const dateFilter = new Date(item.createdAt);
      const dateMenosHoras = new Date(dateFilter.setHours(0, 0, 0, 0));

      const filter =
        dateMenosHoras >= filMenosHouras && dateMenosHoras <= dateAtual;

      return filter;
    });
  }
}
