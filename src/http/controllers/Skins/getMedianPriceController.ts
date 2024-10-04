import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { makeGetMedianPriceUseCase } from "@/useCases/@factories/Skin/makeGetMedianPriceUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getMedianPriceController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { names } = req.body as { names: string[] };

    const getMedianPrice = makeGetMedianPriceUseCase();
    const response = await getMedianPrice.execute(names);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof SkinNotExistError) {
      return reply.status(404).send({ message: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
