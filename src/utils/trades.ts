import axios from "axios";

export class Trades {
  constructor() {}

  static async getTradeHistory() {
    const key = "C3B106395E5E2FCD39B30DF5E85C28E0";

    const trades = axios
      .get(
        `https://api.steampowered.com/IEconService/GetTradeHistory/v1/?key=${key}&max_trades=50&get_descriptions=false&language=EN&include_failed=true&include_total=true`
      )
      .then((res) => res.data)
      .catch((err) => err.message);

    return trades;
  }

  static async filterTradeHistory(steamId: string, assetId: string) {
    const trades = await this.getTradeHistory();

    if (trades.length > 0) {
      const tradesFiltered = trades.response.trades.filter((trade) => {
        return trade.steamid_other === steamId;
      });

      const assets = tradesFiltered.flatMap((trade) => {
        return trade.assets_received.filter((asset) => {
          console.log(asset.assetid);
          return asset.assetid === assetId;
        });
      });
      return assets;
    }
    console.log("No trades found");
    return "No trades found";
  }
}
