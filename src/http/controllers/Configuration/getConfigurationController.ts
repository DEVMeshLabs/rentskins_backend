import { ConfigurationNotExistError } from "@/useCases/@errors/Configuration/ConfigurationNotExistError";
import { makeGetConfigurationUseCase } from "@/useCases/@factories/Configuration/makeGetConfiguration";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getConfigurationController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { id } = req.params as { id: string };

  try {
    const makeGetConfiguration = makeGetConfigurationUseCase();
    const response = await makeGetConfiguration.execute(id);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof ConfigurationNotExistError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
