import { makeGetSkinMany } from "@/useCases/@factories/Skin/makeGetSkinManyUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getSkinManyController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getSkinMany = makeGetSkinMany();
    const response = await getSkinMany.execute();

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
