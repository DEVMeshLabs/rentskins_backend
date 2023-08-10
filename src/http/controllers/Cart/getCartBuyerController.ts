import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetCartBuyerUseCase } from "@/useCases/@factories/Cart/makeGetCartBuyerUseCase";
import { CartNotExistError } from "@/useCases/@errors/Cart/CartNotExistError";

export async function getCartBuyerController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { buyer_id } = req.params as { buyer_id: string };

  try {
    const makeGetCartBuyer = makeGetCartBuyerUseCase();
    const response = await makeGetCartBuyer.execute(buyer_id);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof CartNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw new Error();
  }
}
