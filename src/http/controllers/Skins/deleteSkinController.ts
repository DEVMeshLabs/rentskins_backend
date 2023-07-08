import { SkinNotExistError } from "@/useCases/errors/SkinNotExistsError";
import { makeDeleteSkinUseCase } from "@/useCases/factories/makeDeleteSkinUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteSkinController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const deleteSkinUseCase = makeDeleteSkinUseCase();
    await deleteSkinUseCase.execute(id);
  } catch (error) {
    if (error instanceof SkinNotExistError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(200).send();
}
