import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserNotificationUseCase } from "@/useCases/@factories/Notification/makeGetUserNotificationUseCase";
import { NotificationNotExistError } from "@/useCases/@errors/Notification/NotificationNotExistError";

export async function getUserNotificationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { owner_id } = req.params as { owner_id: string };

  try {
    const makeUserNot = makeGetUserNotificationUseCase();
    const findUser = await makeUserNot.execute(owner_id);
    return reply.status(200).send(findUser);
  } catch (error) {
    if (error instanceof NotificationNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
