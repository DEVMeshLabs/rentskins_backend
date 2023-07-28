import { ConfigurationNotExistError } from "@/useCases/@errors/Configuration/ConfigurationNotExistError";
import { makeDeleteConfigurationUseCase } from "@/useCases/@factories/Configuration/makeDeleteConfigurationUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteConfigurationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const makeGetConfiguration = makeDeleteConfigurationUseCase();
    await makeGetConfiguration.execute(id);
  } catch (error) {
    if (error instanceof ConfigurationNotExistError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
  return reply.status(200).send();
}
