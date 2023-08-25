import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetManySkinNotification } from "@/useCases/@factories/Notification/makeGetManySkinNotificationUseCase";
import { getManyUserNotificationSchema } from "./Schemas/getManyUserNotificationSchema";

export async function getManySkinNotificationController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { owner_id } = req.params as { owner_id: string };
  const { tempo } = getManyUserNotificationSchema.parse(req.body);
  try {
    const makeCreateNot = makeGetManySkinNotification();
    const response = await makeCreateNot.execute(owner_id, tempo);
    return reply.status(200).send(response);
  } catch (error) {
    throw new Error();
  }
}
