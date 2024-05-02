import { makeGetSkinFloatUseCase } from "@/useCases/@factories/Skin/makeGetSkinFloatUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getFloatSkinController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { url } = req.body as any;
  console.log(url);

  try {
    const getSkinFloat = makeGetSkinFloatUseCase();
    const response = await getSkinFloat.execute(url);
    console.log(response);
    return reply.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
}
