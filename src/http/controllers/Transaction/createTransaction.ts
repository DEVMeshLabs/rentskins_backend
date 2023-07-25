import { FastifyRequest, FastifyReply } from "fastify";

export async function createTransaction(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { owner_id } = req.body as { owner_id };
}
