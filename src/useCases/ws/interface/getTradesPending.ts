export interface Participantitem {
  market_hash_name: string;
  image: string;
  description: string;
  classid: string;
  instanceid: string;
  appid: string;
  safe: boolean;
  pricelatest: number;
  pricelatestsell: number;
  pricereal: number;
}

export interface Myitem {
  market_hash_name: string;
  image: string;
  description: string;
  classid: string;
  instanceid: string;
  appid: string;
  safe: boolean;
  pricelatest: number;
  pricelatestsell: number;
  pricereal: number;
}

export interface Tradeoffer {
  participant: string;
  participantsteamid: any;
  myitems: Myitem[];
  participantitems: Participantitem[];
  expire: string;
  tradeofferid: string;
  steamconfirmed: boolean;
}

export interface Payload {
  success: boolean;
  status: number;
  steamid: string;
  tradeoffers: Tradeoffer;
}

export interface JsonPayload {
  md5apikeyforverification: string;
  event: string;
  steamid: string;
  info: string;
  payload: Payload;
  verified: boolean;
}

export interface IGetTradesPending {
  id: string;
  jsonPayload: JsonPayload;
}
