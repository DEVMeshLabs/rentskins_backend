import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { makeUpdateSkinUseCase } from "@/useCases/@factories/Skin/makeUpdateSkinUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export function updateSkinController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const data = req.body;

  try {
    const updateSkin = makeUpdateSkinUseCase();
    const up = updateSkin.execute(id, data);
    return reply.status(200).send(up);
  } catch (error) {
    if (error instanceof SkinNotExistError) {
      reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
