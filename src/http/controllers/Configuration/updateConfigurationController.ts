import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { updateConfigurationSchema } from "./Schemas/updateConfigurationSchema";
import { makeUpdateConfigurationUseCase } from "@/useCases/@factories/Configuration/makeUpdateConfigurationUSeCase";
import { ConfigurationNotExistError } from "@/useCases/@errors/Configuration/ConfigurationNotExistError";

export async function updateConfigurationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const data = updateConfigurationSchema.parse(req.body);
    const updateConfig = makeUpdateConfigurationUseCase();
    await updateConfig.execute(id, { ...data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: "Erro de validação", errors: error.errors });
    } else if (error instanceof ConfigurationNotExistError) {
      return reply.status(404).send({ errors: error.message });
    }
    throw error;
  }

  return reply.status(204).send();
}
