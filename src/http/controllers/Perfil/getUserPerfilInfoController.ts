import { PerfilInfoNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { makeGetUserPerfilInfo } from "@/useCases/@factories/PerfilInfo/makeGetUserPerfilInfo";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getUserPerfilInfoController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { owner_id } = req.params as { owner_id: string };

  try {
    const getUserPerfilInfoUserUseCase = makeGetUserPerfilInfo();
    const perfil = await getUserPerfilInfoUserUseCase.execute(owner_id);
    return reply.status(200).send(perfil);
  } catch (error) {
    if (error instanceof PerfilInfoNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
