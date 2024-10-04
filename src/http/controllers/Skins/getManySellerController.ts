import { makeGetManySellerUseCase } from "@/useCases/@factories/Skin/makeGetManySellerUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { paginationSkinsSchema } from "./Schemas/paginationSkinsSchema";

export async function getManyCartController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { seller_id } = req.params as { seller_id: string };

  try {
    const getManySeller = makeGetManySellerUseCase();
    const { deletedAt } = paginationSkinsSchema.parse(req.query);

    const response = await getManySeller.execute(seller_id, deletedAt);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
