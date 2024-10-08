import { makeCreateConfigurationUseCase } from "@/useCases/@factories/Configuration/makeCreateConfigurationUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { createConfigurationSchema } from "./Schemas/createConfigurationSchema";
import { z } from "zod";
import { ConfigurationAlreadyExistError } from "@/useCases/@errors/Configuration/ConfigurationAlreadyExistError";

export async function createConfigurationController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const {
      owner_id,
      owner_email,
      owner_name,
      owner_phone,
      owner_cpf,
      url_sell,
      url_trade,
      agreed_with_emails,
      agreed_with_terms,
    } = createConfigurationSchema.parse(req.body);
    const createConfig = makeCreateConfigurationUseCase();
    await createConfig.execute({
      owner_id,
      owner_email,
      owner_name,
      owner_phone,
      owner_cpf,
      url_sell,
      url_trade,
      agreed_with_emails,
      agreed_with_terms,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: "Erro de validação", errors: error.errors });
    } else if (error instanceof ConfigurationAlreadyExistError) {
      return reply.status(409).send({ errors: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }

  return reply.status(201).send();
}
