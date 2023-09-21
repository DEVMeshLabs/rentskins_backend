const market = require("steam-market-pricing");

export class GetMedianPriceUseCase {
  constructor() {}
  async execute(names: string[]) {
    const currency = 7;

    const response = await market
      .getItemsPrices(730, names, currency)
      .then((items: any) =>
        names.map((name) => `${name}: ${items[name].median_price}`)
      );
    return response;
  }
}
