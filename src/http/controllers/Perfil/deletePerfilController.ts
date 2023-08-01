import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { makeDeletePerfil } from "@/useCases/@factories/Perfil/makeDeletePerfil";

import { FastifyRequest, FastifyReply } from "fastify";

export async function deletePerfilController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const getUserPerfilInfoUserUseCase = makeDeletePerfil();
    await getUserPerfilInfoUserUseCase.execute(id);
  } catch (error) {
    if (error instanceof PerfilNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(200).send();
}
