import axios from "axios";

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
    assetId: String,
    assets_received: boolean
  ): Promise<boolean | string> {
    try {
      const trades = await this.getTradeHistory(key);
      if (trades.response.trades && trades.response.trades.length > 0) {
        const tradesFiltered = trades.response.trades.filter((trade) => {
          return trade.steamid_other === steamIdOther && trade.status === 3;
        });

        let dados;

        if (assets_received) {
          dados = this.filterAssets(tradesFiltered, "assets_received", assetId);
        } else {
          dados = this.filterAssets(tradesFiltered, "assets_given", assetId);
        }

        const isAlreadyExistAsset = dados.some(
          (item) => item.assetid === assetId
        );

        return isAlreadyExistAsset;
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  }

  static filterAssets(trades, assetKey, assetId) {
    return trades.reduce((acc, trade) => {
      const filteredAssets = trade[assetKey].filter(
        (asset) => asset.assetid === assetId
      );
      return acc.concat(filteredAssets);
    }, []);
  }
}
