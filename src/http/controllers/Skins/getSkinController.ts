import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { makeGetSkinUseCase } from "@/useCases/@factories/Skin/makeGetSkinUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getSkinController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const getSkinUseCase = makeGetSkinUseCase();
    const response = await getSkinUseCase.execute(id);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof SkinNotExistError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
