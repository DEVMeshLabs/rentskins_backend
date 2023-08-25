import { SellerNotExistError } from "@/useCases/@errors/Skin/SellerNotExistError";
import { makeGetHistoricUseCase } from "@/useCases/@factories/Skin/makeGetHistoricUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getHistoricSellerController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { seller } = req.params as { seller: string };

  try {
    const getManySeller = makeGetHistoricUseCase();

    const response = await getManySeller.execute(seller);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof SellerNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
