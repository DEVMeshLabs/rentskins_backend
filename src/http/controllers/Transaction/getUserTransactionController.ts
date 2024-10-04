import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserTransactionUseCase } from "@/useCases/@factories/Transaction/makeGetUserTransactionUseCase";
import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";

export async function getUserTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };
    const { query } = req.query as { query: string };

    const getUser = makeGetUserTransactionUseCase();
    const response = await getUser.execute(id, query);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof PerfilNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
