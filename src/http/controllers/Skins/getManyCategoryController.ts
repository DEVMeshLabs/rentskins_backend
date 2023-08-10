import { makeGetManyCategory } from "@/useCases/@factories/Skin/makeGetManyCategory";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyCategoryController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { category } = req.params as { category: string };

  try {
    const getManyCategory = makeGetManyCategory();

    const findAll = await getManyCategory.execute(category);
    return reply.status(200).send(findAll);
  } catch (error) {
    throw new Error();
  }
}
