import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetCartBuyerUseCase } from "@/useCases/factories/Cart/makeGetCartBuyerUseCase";

export async function getCartBuyerController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { buyer_id } = req.params as { buyer_id: string };

  try {
    const makeGet = makeGetCartBuyerUseCase();
    const getCart = await makeGet.execute(buyer_id);
    return reply.status(200).send(getCart);
  } catch (error) {
    throw new Error();
  }
}
