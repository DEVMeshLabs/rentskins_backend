import { FastifyRequest, FastifyReply } from "fastify";
import { NotificationNotExistError } from "@/useCases/errors/Notification/NotificationNotExistError";
import { makeUpdateManyNotificationUseCase } from "@/useCases/factories/Notification/makeUpdateNotificationUseCase";

export async function updateManyNotificationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const makeGetNot = makeUpdateManyNotificationUseCase();
    await makeGetNot.execute();
  } catch (error) {
    if (error instanceof NotificationNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(200).send();
}
