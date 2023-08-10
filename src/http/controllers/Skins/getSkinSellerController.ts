import { SellerNotExistError } from "@/useCases/@errors/Skin/SellerNotExistError";
import { makeGetSkinSeller } from "@/useCases/@factories/Skin/makeGetSkinSellerUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getSkinSellerController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { seller_id } = req.params as { seller_id: string };

  try {
    const getSkinSellerUseCase = makeGetSkinSeller();
    const response = await getSkinSellerUseCase.execute(seller_id);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof SellerNotExistError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
