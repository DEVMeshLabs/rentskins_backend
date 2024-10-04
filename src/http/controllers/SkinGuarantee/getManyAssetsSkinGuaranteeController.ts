import { makeGetManyAssetsSkinGuarantee } from "@/useCases/@factories/SkinGuarantee/makeGetManyAssetsSkinGuarantee";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyAssetsSkinGuaranteeController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { assets } = req.body as { assets: string[] };
    const getManyGuaranteeSend = makeGetManyAssetsSkinGuarantee();

    const findAll = await getManyGuaranteeSend.execute(assets);

    return reply.status(200).send(findAll);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
