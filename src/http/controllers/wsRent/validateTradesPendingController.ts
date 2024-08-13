import { TransactionHistoryNotExistError } from "@/useCases/@errors/TransactionHistory/TransactionHistoryNotExistError";
import { StatusHasAlreadyBeenUpdatedError } from "@/useCases/@errors/ws/StatusHasAlreadyBeenUpdatedError";
import { makeGetTransactionRent } from "@/useCases/@factories/RentalTransaction/makeGetRentalTransaction";
import { makeUpdateStatusTransactionRentalUseCase } from "@/useCases/@factories/RentalTransaction/makeUpdateStatusTransactionRentalUseCase";
import { Myitem, Tradeoffer } from "@/useCases/ws/interface/getTradesPending";
import { FastifyRequest, FastifyReply } from "fastify";

export async function rentValidateTradesPendingController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void | String> {
  const { transactionId } = req.params as { transactionId: string };
  const body = req.body as any;

  try {
    const makeTransactionRentId = makeGetTransactionRent();
    const makeUpdate = makeUpdateStatusTransactionRentalUseCase();

    const transactionRent = await makeTransactionRentId.execute(transactionId);
    console.log(transactionRent);

    if (!transactionRent) {
      throw new TransactionHistoryNotExistError();
    } else if (transactionRent.status === "WaitingForSellerConfirmation") {
      throw new StatusHasAlreadyBeenUpdatedError();
    }
    const tradeoffers = body.payload.tradeoffers;

    if (transactionRent.status === "WaitingForGuaranteeConfirmation") {
      const filterSkin = tradeoffers.filter(
        (item: Tradeoffer) =>
          item.participantsteamid === transactionRent.buyerId
      );
      console.log(tradeoffers);
      if (filterSkin.length > 0) {
        console.log("Entrou no if");
        const filterItem = filterSkin.filter((item: Tradeoffer) => {
          return item.myitems.filter((item: Myitem) => {
            console.log("MyItem", item);
            return transactionRent.skinsGuarantee.filter((garante) => {
              console.log("Garante", garante);
              return (
                item.market_hash_name === garante.skin_market_hash_name &&
                item.instanceid === garante.skin_instanceid &&
                item.classid === garante.skin_classid
              );
            });
          });
        });
        console.log(filterItem);
        if (filterItem.length > 0) {
          const response = await makeUpdate.execute(
            transactionId,
            "WaitingForAdministrators"
          );
          console.log("Caiu na responde", response);
          return reply.status(200).send(response);
        }
      }
      return reply.status(404).send({ message: "Item not found" });
    }
  } catch (error) {
    if (error instanceof StatusHasAlreadyBeenUpdatedError) {
      return reply.status(409).send({
        message: error.message,
      });
    }
    return reply.status(500).send({
      message: "Error",
      err: error.message,
    });
  }
}
