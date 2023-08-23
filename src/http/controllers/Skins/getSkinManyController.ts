import { makeGetSkinMany } from "@/useCases/@factories/Skin/makeGetSkinManyUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function getSkinManyController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const searchGymsQuerySchema = z.object({
      page: z.coerce.number().min(1).default(1),
      pageSize: z.coerce.number().min(1).default(20),
    });

    const { page, pageSize } = searchGymsQuerySchema.parse(req.query);

    const getSkinMany = makeGetSkinMany();
    const response = await getSkinMany.execute(page, pageSize);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
