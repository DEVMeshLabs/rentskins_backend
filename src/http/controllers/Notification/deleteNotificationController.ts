import { FastifyRequest, FastifyReply } from "fastify";
import { NotificationNotExistError } from "@/useCases/@errors/Notification/NotificationNotExistError";
import { makeDeleteNotificationUseCase } from "@/useCases/@factories/Notification/makeDeleteNotificationUseCase";

export async function deleteNotificationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const makeDelete = makeDeleteNotificationUseCase();
    const deleteId = await makeDelete.execute(id);
    return reply.status(200).send(deleteId);
  } catch (error) {
    if (error instanceof NotificationNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
