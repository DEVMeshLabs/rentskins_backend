import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetManyUserNotification } from "@/useCases/@factories/Notification/makeGetManySkinNotificationUseCase";
import { getManyUserNotificationSchema } from "./Schemas/getManyUserNotificationSchema";
import { ZodError } from "zod";

export async function getManyUserNotificationController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { owner_id } = req.params as { owner_id: string };
  const { tempo, page, pageSize } = getManyUserNotificationSchema.parse(
    req.body
  );
  try {
    const findManyUserNotifications = makeGetManyUserNotification();
    const response = await findManyUserNotifications.execute(
      owner_id,
      tempo,
      page,
      pageSize
    );
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message });
    }
    throw new Error();
  }
}
