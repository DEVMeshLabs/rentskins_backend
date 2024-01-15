export class DataPagination {
  public static execute(pages: number, itemsPerPage: number, array: Object[]) {
    const maxPages = Math.ceil(array.length / itemsPerPage);
    const pagination = pages * itemsPerPage;
    const newArray = array.slice(pagination - itemsPerPage, pagination);
    return {
      maxItems: array.length,
      maxPages,
      inventory: newArray,
    };
  }
}
