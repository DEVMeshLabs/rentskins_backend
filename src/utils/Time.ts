export default class Time {
  public static dateAfter24Hours() {
    const newDate = new Date();

    newDate.setHours(newDate.getHours() + 24);

    if (newDate.getHours() >= 24) {
      newDate.setDate(newDate.getDate() + 1);
    }

    return newDate;
  }
}
