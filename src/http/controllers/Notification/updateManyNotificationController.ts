import { FastifyRequest, FastifyReply } from "fastify";
import { NotificationNotExistError } from "@/useCases/@errors/Notification/NotificationNotExistError";
import { makeUpdateManyNotificationUseCase } from "@/useCases/@factories/Notification/makeUpdateNotificationUseCase";

export async function updateManyNotificationController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { owner_id } = req.params as { owner_id: string };

  try {
    const makeUpdateNot = makeUpdateManyNotificationUseCase();
    await makeUpdateNot.execute(owner_id);
  } catch (error) {
    if (error instanceof NotificationNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
  return reply.status(204).send();
}
