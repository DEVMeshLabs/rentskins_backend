import { StatusHasAlreadyBeenUpdatedError } from "@/useCases/@errors/ws/StatusHasAlreadyBeenUpdatedError";
import { makeValidateTradesPendingUseCase } from "@/useCases/@factories/ws/makeValidateTradesPendingUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function validateTradesPendingController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { transactionId } = req.params as { transactionId: string };
  const body = req.body;
  console.log("Entrou validate Trades Pedding");
  try {
    const makeValidade = makeValidateTradesPendingUseCase();
    const response = await makeValidade.execute(transactionId, body as any);
    console.log("Controller Pending", response);
    return reply.status(200).send(response);
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
