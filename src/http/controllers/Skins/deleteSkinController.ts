import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { makeDeleteSkinUseCase } from "@/useCases/@factories/Skin/makeDeleteSkinUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteSkinController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { id } = req.params as { id: string };

  try {
    const deleteSkinUseCase = makeDeleteSkinUseCase();
    await deleteSkinUseCase.execute(id);
  } catch (error) {
    if (error instanceof SkinNotExistError) {
      return reply.status(404).send({ message: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
  return reply.status(204).send();
}
