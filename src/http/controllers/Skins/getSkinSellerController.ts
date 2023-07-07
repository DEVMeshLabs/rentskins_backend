import { SkinNotExistError } from "@/useCases/errors/SkinNotExistsError";
import { makeGetSkinSeller } from "@/useCases/factories/makeGetSkinSellerUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getSkinSellerController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { seller_id } = req.params as { seller_id: string };

  try {
    const getSkinSellerUseCase = makeGetSkinSeller();
    const findBySeller = await getSkinSellerUseCase.execute(seller_id);
    return reply.status(200).send(findBySeller);
  } catch (error) {
    if (error instanceof SkinNotExistError) {
      return reply.status(404).send({ message: error.message });
    }
  }
}
