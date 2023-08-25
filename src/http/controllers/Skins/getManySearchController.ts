import { makeGetManySearchUseCase } from "@/useCases/@factories/Skin/makeGetManySearchUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";
import { paginationSkinsSchema } from "./Schemas/paginationSkinsSchema";

export async function getManySearchController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { name } = req.params as { name: string };

  try {
    const { page, pageSize } = paginationSkinsSchema.parse(req.query);

    const getManyName = makeGetManySearchUseCase();

    const response = await getManyName.execute(name, page, pageSize);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({ error: error.message });
    } else if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message });
    }
    throw error;
  }
}
