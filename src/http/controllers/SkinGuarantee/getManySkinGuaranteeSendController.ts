import { makeGetManySkinGuaranteeSend } from "@/useCases/@factories/SkinGuarantee/makeGetManySkinGuaranteeSend";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManySkinGuaranteeSendController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const getManyGuaranteeSend = makeGetManySkinGuaranteeSend();

    const findAll = await getManyGuaranteeSend.execute();
    return reply.status(200).send(findAll);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
