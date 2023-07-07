import { makeGetSkinMany } from "@/useCases/factories/makeGetSkinManyUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getSkinManyController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getSkinMany = makeGetSkinMany();

    const findAll = await getSkinMany.execute();
    return reply.status(200).send(findAll);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({ error: error.message });
    }
  }
}
