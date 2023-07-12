import { makeCreateConfigurationUseCase } from "@/useCases/factories/Configuration/makeCreateConfigurationUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { createConfigurationSchema } from "./Schemas/createConfigurationSchema";
import { z } from "zod";

export async function createConfigurationController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const {
      owner_id,
      owner_email,
      owner_name,
      url_sell,
      url_trade,
      steam_guard,
      agreed_with_emails,
      agreed_with_terms,
    } = createConfigurationSchema.parse(req.body);
    const createConfig = makeCreateConfigurationUseCase();
    await createConfig.execute({
      owner_id,
      owner_email,
      owner_name,
      url_sell,
      url_trade,
      steam_guard,
      agreed_with_emails,
      agreed_with_terms,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: "Erro de validação", errors: error.errors });
    }
    throw error;
  }
}
