import { makeGetSkinMany } from "@/useCases/@factories/Skin/makeGetSkinManyUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";
import { paginationSkinsSchema } from "./Schemas/paginationSkinsSchema";

export async function getSkinManyController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { page, pageSize } = paginationSkinsSchema.parse(req.query);
    const getSkinMany = makeGetSkinMany();

    const response = await getSkinMany.execute(page, pageSize);

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
