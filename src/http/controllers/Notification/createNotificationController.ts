import { FastifyRequest, FastifyReply } from "fastify";
import { createNotificationSchema } from "./Schemas/createNotificationSchema";
import { makeCreateNotificationUseCase } from "@/useCases/@factories/Notification/makeCreateNotificationUseCase";
import { z } from "zod";
import { NotificationAlreadyExistError } from "@/useCases/@errors/Notification/NotificationAlreadyExistError";
import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";

export async function createNotificationController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { owner_id, description, skin_id } = createNotificationSchema.parse(
      req.body
    );
    const makeCreateNot = makeCreateNotificationUseCase();
    await makeCreateNot.execute({
      owner_id,
      description,
      skin_id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: "Erro de validação", error: error.errors });
    } else if (error instanceof NotificationAlreadyExistError) {
      return reply.status(409).send({ error: error.message });
    } else if (error instanceof SkinNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
  return reply.status(201).send();
}
