import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetManyNotificationUseCase } from "@/useCases/@factories/Notification/makeGetManyNotificationUseCase";

export async function getManyNotificationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const makeCreateNot = makeGetManyNotificationUseCase();
    const all = await makeCreateNot.execute();
    return reply.status(200).send(all);
  } catch (error) {
    throw new Error();
  }
}
