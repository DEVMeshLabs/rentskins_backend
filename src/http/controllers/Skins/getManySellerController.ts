import { makeGetManySellerUseCase } from "@/useCases/factories/Skin/makeGetManySellerUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyCartController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { seller } = req.params as { seller: string };

  try {
    const getManySeller = makeGetManySellerUseCase();

    const getMany = await getManySeller.execute(seller);

    return reply.status(200).send(getMany);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
