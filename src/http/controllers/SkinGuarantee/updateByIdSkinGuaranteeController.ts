import { makeUpdateByIdSkinGuarantee } from "@/useCases/@factories/SkinGuarantee/makeUpdateByIdSkinGuarantee";
import { FastifyRequest, FastifyReply } from "fastify";

export async function updateByIdSkinGuaranteeSendController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { id } = req.params as { id: string };
  const body = req.body;

  try {
    const getManyGuaranteeSend = makeUpdateByIdSkinGuarantee();
    const response = await getManyGuaranteeSend.execute(id, body);

    return reply.status(200).send(response);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
