import { makeGetManySellerUseCase } from "@/useCases/@factories/Skin/makeGetManySellerUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyCartController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { seller_id } = req.params as { seller_id: string };

  try {
    const getManySeller = makeGetManySellerUseCase();

    const response = await getManySeller.execute(seller_id);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
