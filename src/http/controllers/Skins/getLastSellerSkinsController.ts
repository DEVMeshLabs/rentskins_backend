import { makeGetLastSellerSkinsUseCase } from "@/useCases/@factories/Skin/makeGetLastSellerSkinsUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getLastSellerSkinsController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { name } = req.body as { name: string };

  try {
    const getLastSeller = makeGetLastSellerSkinsUseCase();

    const findAllLastSeller = await getLastSeller.execute(name);
    return reply.status(200).send(findAllLastSeller);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
