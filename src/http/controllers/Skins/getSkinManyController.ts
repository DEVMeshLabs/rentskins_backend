import { makeGetSkinMany } from "@/useCases/@factories/Skin/makeGetSkinManyUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";
import { paginationSkinsSchema } from "./Schemas/paginationSkinsSchema";

export async function getSkinManyController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { page, pageSize, type } = paginationSkinsSchema.parse(req.query);
    console.log(type);
    const getSkinMany = makeGetSkinMany();

    const response = await getSkinMany.execute(page, pageSize, type);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({ error: error.message });
    } else if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
