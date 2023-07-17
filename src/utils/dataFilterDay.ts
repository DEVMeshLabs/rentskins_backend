const atual = new Date().toLocaleDateString();

export class DataFilter {
  public static filterHoje(array: any) {
    const filter = array.filter(
      (item: any) => item.createdAt.toLocaleDateString() === atual
    );
    return filter;
  }

  public static filterGeral(array: any, dias: number) {
    const ano = new Date(new Date().getTime() - dias * 24 * 60 * 60 * 1000);

    return array.filter(
      (item: any) =>
        item.createdAt.toLocaleDateString() <= ano.toLocaleDateString() &&
        item.createdAt.toLocaleDateString() >= ano.toLocaleDateString()
    );
  }
}
