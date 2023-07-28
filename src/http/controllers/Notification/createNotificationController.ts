import { FastifyRequest, FastifyReply } from "fastify";
import { createNotificationSchema } from "./Schemas/createNotificationSchema";
import { makeCreateNotificationUseCase } from "@/useCases/@factories/Notification/makeCreateNotificationUseCase";
import { z } from "zod";
import { NotificationAlreadyExistError } from "@/useCases/@errors/Notification/NotificationAlreadyExistError";

export async function createNotificationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { owner_id, description, owner_name, skin_id } =
      createNotificationSchema.parse(req.body);
    const makeCreateNot = makeCreateNotificationUseCase();
    await makeCreateNot.execute({
      owner_id,
      description,
      owner_name,
      skin_id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: "Erro de validação", error: error.errors });
    } else if (error instanceof NotificationAlreadyExistError) {
      return reply.status(409).send({ error: error.message });
    }

    throw error;
  }
  return reply.status(201).send();
}
