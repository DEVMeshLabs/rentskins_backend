import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetManySkinNotification } from "@/useCases/factories/Notification/makeGetManySkinNotificationUseCase";

export async function getManySkinNotificationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { owner_id } = req.params as { owner_id: string };
  const { tempo } = req.body as { tempo: string };
  try {
    const makeCreateNot = makeGetManySkinNotification();
    const all = await makeCreateNot.execute(owner_id, tempo);
    return reply.status(200).send(all);
  } catch (error) {
    throw new Error();
  }
}
