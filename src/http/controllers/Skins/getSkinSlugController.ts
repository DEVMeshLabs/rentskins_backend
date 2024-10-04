import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { makeSkinSlugUseCase } from "@/useCases/@factories/Skin/makeGetSkinSlugUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getSkinSlugController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { slug } = req.params as { slug: string };

  try {
    const getSkinSlugUseCase = makeSkinSlugUseCase();
    const response = await getSkinSlugUseCase.execute(slug);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof SkinNotExistError) {
      return reply.status(404).send({ message: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
