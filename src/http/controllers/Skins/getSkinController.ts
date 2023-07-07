import { makeGetSkinUseCase } from "@/useCases/factories/makeGetSkinUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getSkinController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id }: any = req.params;

  try {
    const getSkinUseCase = makeGetSkinUseCase();
    const findSkin = await getSkinUseCase.execute(id);
    return reply.status(200).send(findSkin);
  } catch (error) {}
}
