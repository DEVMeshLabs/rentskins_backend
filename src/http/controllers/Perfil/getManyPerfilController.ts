import { PerfilAlreadyExistError } from "@/useCases/@errors/Perfil/PerfilInfoAlreadyExistError";
import { makeGetManyPerfil } from "@/useCases/@factories/Perfil/makeGetManyPerfil";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyPerfilController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const getManyPerfilInfoUserUseCase = makeGetManyPerfil();
    const response = await getManyPerfilInfoUserUseCase.execute();
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof PerfilAlreadyExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw new Error();
  }
}
