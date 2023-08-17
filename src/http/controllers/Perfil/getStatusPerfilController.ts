import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { makeGetStatusPerfil } from "@/useCases/@factories/Perfil/makeGetStatusPerfil";

import { FastifyRequest, FastifyReply } from "fastify";

export async function getStatusPerfilController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const getUserPerfilInfoUserUseCase = makeGetStatusPerfil();
    const response = await getUserPerfilInfoUserUseCase.execute(id);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof PerfilNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
