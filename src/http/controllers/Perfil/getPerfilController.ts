import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { makeGetPerfil } from "@/useCases/@factories/Perfil/makeGetPerfil";

import { FastifyRequest, FastifyReply } from "fastify";

export async function getPerfilController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { id } = req.params as { id: string };

  try {
    const getUserPerfilInfoUserUseCase = makeGetPerfil();
    const response = await getUserPerfilInfoUserUseCase.execute(id);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof PerfilNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
