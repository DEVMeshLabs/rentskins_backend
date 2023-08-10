import { makeGetManyPerfil } from "@/useCases/@factories/Perfil/makeGetManyPerfil";

import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyPerfilController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getManyPerfilInfoUserUseCase = makeGetManyPerfil();
    const response = await getManyPerfilInfoUserUseCase.execute();
    return reply.status(200).send(response);
  } catch (error) {
    throw new Error();
  }
}
