import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { makeUpdateSkinUseCase } from "@/useCases/@factories/Skin/makeUpdateSkinUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function updateSkinController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { id } = req.params as { id: string };
  const data = req.body;

  try {
    const updateSkin = makeUpdateSkinUseCase();
    await updateSkin.execute(id, data);
  } catch (error) {
    if (error instanceof SkinNotExistError) {
      reply.status(404).send({ error: error.message });
    }

    throw error;
  }
  return reply.status(204).send();
}
