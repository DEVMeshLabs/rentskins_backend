import { SkinNotExistError } from "@/useCases/errors/SkinNotExistsError";
import { makeGetSkinUseCase } from "@/useCases/factories/makeGetSkinUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getSkinController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const getSkinUseCase = makeGetSkinUseCase();
    const findSkin = await getSkinUseCase.execute(id);
    return reply.status(200).send(findSkin);
  } catch (error) {
    if (error instanceof SkinNotExistError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
