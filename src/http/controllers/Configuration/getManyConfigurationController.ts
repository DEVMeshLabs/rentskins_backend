import { makeGetManyConfigurationUseCase } from "@/useCases/@factories/Configuration/makeGetManyConfigurationUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyConfigurationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const makeGetMany = makeGetManyConfigurationUseCase();
    const response = await makeGetMany.execute();
    return reply.status(200).send(response);
  } catch (error) {}
}
