import { makeGetManyPerfil } from "@/useCases/@factories/Perfil/makeGetManyPerfil";

import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyPerfilController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getManyPerfilInfoUserUseCase = makeGetManyPerfil();
    const perfil = await getManyPerfilInfoUserUseCase.execute();
    return reply.status(200).send(perfil);
  } catch (error) {
    throw new Error();
  }
}
