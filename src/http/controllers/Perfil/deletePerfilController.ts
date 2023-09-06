import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { makeDeletePerfil } from "@/useCases/@factories/Perfil/makeDeletePerfil";

import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function deletePerfilController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { id } = req.params as { id: string };

  const deleteSchema = z.object({
    force: z.string().default("false"),
  });

  const { force } = deleteSchema.parse(req.query);
  console.log(force);
  try {
    const getUserPerfilInfoUserUseCase = makeDeletePerfil();
    await getUserPerfilInfoUserUseCase.execute(id, force);
  } catch (error) {
    if (error instanceof PerfilNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(204).send();
}
