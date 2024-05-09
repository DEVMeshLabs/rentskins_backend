export interface Item {
  markethashname: string;
  appid: string;
  assetid: string;
  classid: string;
  instanceid: string;
  amount: number;
  contextid: string;
  iconurl: string;
  tradable: number;
}

export interface Items {
  received: Item[];
  sent: Item[];
}

export interface Daum {
  date: string;
  timestamp: number;
  participantusername: string;
  participanturl: string;
  participantsteamid: string;
  items: Items;
}

export interface Payload {
  datetime: string;
  type: string;
  steamid: string;
  verified: boolean;
  data: Daum[];
}

export interface jsonPayload {
  md5apikeyforverification: string;
  event: string;
  steamid: string;
  info: string;
  payload: Payload;
  verified: boolean;
}

export interface IGetHistoricTrade {
  id: string;
  jsonPayload: jsonPayload;
}
