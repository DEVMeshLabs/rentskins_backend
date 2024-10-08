import { ConfigurationNotExistError } from "@/useCases/@errors/Configuration/ConfigurationNotExistError";
import { makeDeleteConfigurationUseCase } from "@/useCases/@factories/Configuration/makeDeleteConfigurationUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteConfigurationController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { id } = req.params as { id: string };

  try {
    const makeGetConfiguration = makeDeleteConfigurationUseCase();
    await makeGetConfiguration.execute(id);
  } catch (error) {
    if (error instanceof ConfigurationNotExistError) {
      return reply.status(404).send({ error: error.message });
    }

    return reply.status(500).send({ error: error.message });
  }
  return reply.status(204).send();
}
