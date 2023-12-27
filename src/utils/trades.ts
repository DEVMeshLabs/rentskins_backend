import axios from "axios";

interface IAssetsType {
  appid: number;
  contextid: string;
  assetid: string;
  amount: string;
  classid: string;
  instanceid: string;
  new_assetid: string;
  new_contextid: string;
}

interface IAssets {
  tradeid: string;
  steamid_other: string;
  time_init: number;
  status: number;
  assets_given: IAssetsType[];
  assets_received: IAssetsType[];
}

export class Trades {
  static async getTradeHistory(key: string) {
    try {
      const response = await axios.get(
        `https://api.steampowered.com/IEconService/GetTradeHistory/v1/?key=${key}&max_trades=50&get_descriptions=false&language=EN&include_failed=true&include_total=true`
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * Filters the trade history based on the provided parameters.
   *
   * @return {Promise<boolean | string>} A Promise that resolves to a boolean indicating whether the specified asset exists in the trade history, or a string indicating that no trades were found.
   */

  static async filterTradeHistory(
    steamIdOther: string,
    key: string,
    assetId: string
  ) {
    try {
      const trades = await this.getTradeHistory(key);
      const validandoTradesHistori =
        trades.response.trades && trades.response.trades.length > 0;

      if (validandoTradesHistori) {
        const tradesFiltered = trades.response.trades.filter((trade) => {
          return trade.steamid_other === steamIdOther && trade.status === 3;
        });

        const filteredTrades = tradesFiltered.flatMap((item: IAssets) => {
          const assetsGiven = Array.isArray(item.assets_given)
            ? item.assets_given
            : [];
          const assetsReceived = Array.isArray(item.assets_received)
            ? item.assets_received
            : [];

          const allAssets = [...assetsGiven, ...assetsReceived];

          return allAssets.filter((asset: IAssetsType) => {
            if (asset.assetid === assetId) {
              return true;
            }

            return false;
          });
        });

        return filteredTrades;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
