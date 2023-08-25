import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetManyNotificationUseCase } from "@/useCases/@factories/Notification/makeGetManyNotificationUseCase";

export async function getManyNotificationController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const makeCreateNot = makeGetManyNotificationUseCase();
    const response = await makeCreateNot.execute();
    return reply.status(200).send(response);
  } catch (error) {
    throw new Error();
  }
}
