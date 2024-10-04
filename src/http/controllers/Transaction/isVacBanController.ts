import { FastifyRequest, FastifyReply } from "fastify";
import { makeIsVacBanUseCase } from "@/useCases/@factories/Transaction/makeIsVacBanUseCase";

export async function isVacBanController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };

    const isVacBan = makeIsVacBanUseCase();
    const response = await isVacBan.execute(id);

    return reply.status(200).send(response.players[0].VACBanned);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
