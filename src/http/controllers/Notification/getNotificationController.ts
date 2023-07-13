import { FastifyRequest, FastifyReply } from "fastify";
import { NotificationNotExistError } from "@/useCases/errors/Notification/NotificationNotExistError";
import { makeGetNotificationUseCase } from "@/useCases/factories/Notification/makeGetNotificationUseCase";

export async function getNotificationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const makeGetNot = makeGetNotificationUseCase();
    const findId = await makeGetNot.execute(id);
    return reply.status(200).send(findId);
  } catch (error) {
    if (error instanceof NotificationNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
