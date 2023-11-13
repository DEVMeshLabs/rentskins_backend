import axios from "axios";

export class Trades {
  static async getTradeHistory(key: string) {
    try {
      const response = await axios.get(
        `https://api.steampowered.com/IEconService/GetTradeHistory/v1/?key=${key}&max_trades=50&get_descriptions=false&language=EN&include_failed=true&include_total=true`
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error.message;
    }
  }

  static async filterTradeHistory(): Promise<boolean | string> {
    const steamidOther = "76561198862407248";
    const assetId = "34489117389";
    const key = "C3B106395E5E2FCD39B30DF5E85C28E0";
    let isVerifyStatus: true | false = false;

    try {
      const trades = await this.getTradeHistory(key);

      if (trades.response.trades.length > 0) {
        const tradesFiltered = trades.response.trades.filter(
          (trade) => trade.steamid_other === steamidOther
        );

        const assets = tradesFiltered.flatMap((trade) => {
          if (trade.status === 3) {
            isVerifyStatus = true;
          }

          return trade.assets_received.filter(
            (asset) => asset.assetid === assetId
          );
        });

        const isAlreadyExistAsset = assets.some(
          (item) => item.assetid === assetId && isVerifyStatus
        );

        return isAlreadyExistAsset;
      }

      console.log("No trades found");
      return "No trades found";
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
