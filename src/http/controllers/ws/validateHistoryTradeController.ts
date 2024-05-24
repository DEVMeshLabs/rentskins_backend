import { TransactionHistoryNotExistError } from "@/useCases/@errors/TransactionHistory/TransactionHistoryNotExistError";
import { ValidateTransactionHistoryError } from "@/useCases/@errors/ws/validateTransactionHistoryError";
import { makeCreateNotificationUseCase } from "@/useCases/@factories/Notification/makeCreateNotificationUseCase";
import { makeGetUserPerfil } from "@/useCases/@factories/Perfil/makeGetUserPerfil";
import { makeUpdateUserPerfil } from "@/useCases/@factories/Perfil/makeUpdatePerfil";
import { makeUpdateSkinUseCase } from "@/useCases/@factories/Skin/makeUpdateSkinUseCase";
import { makeGetIdTransactionUseCase } from "@/useCases/@factories/Transaction/makeGetIdTransactionUseCase";
import { makeUpdateStatusTransactionUseCase } from "@/useCases/@factories/Transaction/makeUpdateStatusTransactionUseCase";
import { makeGetByIdTransactionHistoryTransUseCase } from "@/useCases/@factories/TransactionHistory/makeGetByIdTransactionHistoryTransUseCase";
import { makeUpdateWalletsValueUsersUseCase } from "@/useCases/@factories/Wallet/makeUpdateWalletsValueUsersUseCase";
import { IGetHistoricTrade } from "@/useCases/ws/interface/getHistoricTrade";
import { formatBalance } from "@/utils/formatBalance";
import { FastifyRequest, FastifyReply } from "fastify";

export async function validateHistoryTradeController(
  req: FastifyRequest<{
    Body: { historic: IGetHistoricTrade };
  }>,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { historic }: { historic: IGetHistoricTrade } = req.body;
  const { transactionId } = req.params as { transactionId: string };

  const makehistory = makeGetByIdTransactionHistoryTransUseCase();
  const makeNotification = makeCreateNotificationUseCase();
  const makeTransaction = makeGetIdTransactionUseCase();
  const makeTransactionUpdate = makeUpdateStatusTransactionUseCase();
  const makePerfilUser = makeGetUserPerfil();
  const makePerfilUpdateTotal = makeUpdateUserPerfil();
  const makeSkinUpdate = makeUpdateSkinUseCase();
  const makeWalletUpdate = makeUpdateWalletsValueUsersUseCase();

  async function handleSuccessTransaction({ transactionHistory }) {
    console.log("Iniciou a transação");
    const perfilSeller = await makePerfilUser.execute(
      transactionHistory.seller_id
    );

    const transaction = await makeTransaction.execute(
      transactionHistory.transaction_id
    );
    const { porcentagem } = formatBalance(transaction.balance);

    await Promise.all([
      makePerfilUpdateTotal.execute(perfilSeller.id, {
        total_exchanges_completed: perfilSeller.total_exchanges_completed + 1,
      }),

      transactionHistory.updateId(transactionHistory.id, {
        processTransaction: "Completed",
      }),
      makeTransactionUpdate.execute(transaction.id, "NegociationAccepted"),
      makeNotification.execute({
        owner_id: transactionHistory.seller_id,
        description: `Parabéns! Sua venda foi finalizada com sucesso. O valor recebido foi de ${porcentagem}.`,
      }),
      makeNotification.execute({
        owner_id: transactionHistory.buyer_id,
        description: `Parabéns! Sua compra foi finalizada com sucesso.`,
      }),
      makeSkinUpdate.execute(transaction.skin_id, {
        status: "Concluído",
        saledAt: new Date(),
      }),
      makeWalletUpdate.execute(
        transactionHistory.seller_id,
        "increment",
        porcentagem
      ),
    ]);
  }

  try {
    const transactionHistory = await makehistory.execute(transactionId);
    if (!transactionHistory) {
      throw new TransactionHistoryNotExistError();
    }
    console.log("Passou aqui");
    if (transactionHistory.processTransaction === "Pending") {
      const filterTransactionParticipantsId =
        historic.jsonPayload.payload.data.filter(
          (item) =>
            item.participantsteamid === transactionHistory.buyer_id &&
            item.items.sent.length > 0
        );
      console.log(
        "filterTransactionParticipantsId",
        filterTransactionParticipantsId
      );
      console.log("Passou aqui 2");
      const filterTransactionParticipantsItems = filterTransactionParticipantsId
        .map((sents) => {
          const filteredItems = sents.items.sent.some((item) => {
            return item.assetid === transactionHistory.asset_id;
          });
          return filteredItems;
        })
        .filter(Boolean);

      console.log(
        "filterTransactionParticipantsItems",
        filterTransactionParticipantsItems
      );
      console.log("Passou aqui 3");
      if (filterTransactionParticipantsItems.length > 0) {
        console.log("Passou aqui 4");
        await handleSuccessTransaction({
          transactionHistory,
        });
      }
    }
  } catch (error) {
    if (error instanceof ValidateTransactionHistoryError) {
      return reply.status(404).send({ message: error.message });
    } else if (error instanceof TransactionHistoryNotExistError) {
      return reply.status(404).send({ message: error.message });
    }
  }
  return reply.status(500).send({ message: "Internal Server Error" });
}
