import { ConfigurationNotExistError } from "@/useCases/@errors/Configuration/ConfigurationNotExistError";
import { makeGetConfigurationUseCase } from "@/useCases/@factories/Configuration/makeGetConfiguration";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getConfigurationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const makeGetConfiguration = makeGetConfigurationUseCase();
    const findConfig = await makeGetConfiguration.execute(id);
    return reply.status(200).send(findConfig);
  } catch (error) {
    if (error instanceof ConfigurationNotExistError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
