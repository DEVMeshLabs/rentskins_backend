import { ConfigurationNotExistError } from "@/useCases/@errors/Configuration/ConfigurationNotExistError";
import { makeGetUserConfigurationUseCase } from "@/useCases/@factories/Configuration/makeGetUserConfigurationUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getUserConfigurationController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { owner_id } = req.params as { owner_id: string };

  try {
    const makeGetConfiguration = makeGetUserConfigurationUseCase();
    const response = await makeGetConfiguration.execute(owner_id);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof ConfigurationNotExistError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
