import { makeGetManyTypeUser } from "@/useCases/@factories/Perfil/makeGetManyTypeUser";

import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyTypeUserController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { owner_type } = req.query as { owner_type: string };

    const getManyPerfilInfoUserUseCase = makeGetManyTypeUser();
    const perfilType = await getManyPerfilInfoUserUseCase.execute(owner_type);
    return reply.status(200).send(perfilType);
  } catch (error) {
    return reply.status(500).send(error.message);
  }
}
