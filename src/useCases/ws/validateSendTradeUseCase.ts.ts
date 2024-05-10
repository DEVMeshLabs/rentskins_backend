// import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
// import { IGetHistoricTrade } from "./interface/getHistoricTrade";
// import { TransactionHistory } from "@prisma/client";
// import { formatBalance } from "@/utils/formatBalance";
// import { ValidateTransactionHistoryError } from "../@errors/ws/validateTransactionHistoryError";
// import { TransactionHistoryNotExistError } from "../@errors/TransactionHistory/TransactionHistoryNotExistError";

// interface IUpdateTransactionHistory {
//   transactionHistory: TransactionHistory;
// }

// export class ValidateSendTradeUseCase {
//   constructor(private transactionHistory: ITransactionHistoryRepository) {}

//   async execute(
//     historyId: string,
//     historic: IGetHistoricTrade
//   ): Promise<void | string> {
//     const transactionHistory = await this.transactionHistory.findByTrasactionId(
//       historyId
//     );

//     if (!transactionHistory) {
//       throw new TransactionHistoryNotExistError();
//     }

//     if (
//       historic &&
//       historic.jsonPayload.payload &&
//       historic.jsonPayload.payload.verified === true &&
//       historic.jsonPayload.payload.data &&
//       historic.jsonPayload.payload.data.length > 0 &&
//       transactionHistory.processTransaction === "Pending"
//     ) {
//       const filterTransactionParticipantsId =
//         historic.jsonPayload.payload.data.filter(
//           (data) =>
//             data.participantsteamid === transactionHistory.buyer_id &&
//             data.items.sent.length > 0
//         );
//       const filterTransactionParticipantsItems = filterTransactionParticipantsId
//         .map((sents) => {
//           const filteredItems = sents.items.sent.some((item) => {
//             return item.assetid === transactionHistory.asset_id;
//           });
//           return filteredItems;
//         })
//         .filter(Boolean);

//       if (filterTransactionParticipantsItems.length === 0) {
//         throw new ValidateTransactionHistoryError();
//       }
//     }
//   }
// }
