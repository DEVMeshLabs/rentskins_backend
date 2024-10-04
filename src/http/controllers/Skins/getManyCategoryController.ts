import { makeGetManyCategory } from "@/useCases/@factories/Skin/makeGetManyCategory";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyCategoryController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { category } = req.params as { category: string };

  try {
    const getManyCategory = makeGetManyCategory();

    const findAll = await getManyCategory.execute(category);
    return reply.status(200).send(findAll);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
