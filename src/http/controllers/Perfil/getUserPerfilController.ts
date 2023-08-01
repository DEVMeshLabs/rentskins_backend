import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { makeGetUserPerfil } from "@/useCases/@factories/Perfil/makeGetUserPerfil";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getUserPerfilController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { owner_id } = req.params as { owner_id: string };

  try {
    const getUserPerfilInfoUserUseCase = makeGetUserPerfil();
    const perfil = await getUserPerfilInfoUserUseCase.execute(owner_id);
    return reply.status(200).send(perfil);
  } catch (error) {
    if (error instanceof PerfilNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}