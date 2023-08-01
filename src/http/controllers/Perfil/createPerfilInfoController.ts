import { makeCreatePerfilInfo } from "@/useCases/@factories/PerfilInfo/makeCreatePerfilInfo";
import { FastifyRequest, FastifyReply } from "fastify";
import { createPerfilInfoSchema } from "./Schemas/createPerfilInfoSchema";
import { PerfilInfoAlreadyExistError } from "@/useCases/@errors/Perfil/PerfilInfoAlreadyExistError";

export async function createPerfilInfoController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const {
      owner_id,
      status_member,
      delivery_fee,
      delivery_time,
      total_exchanges,
    } = createPerfilInfoSchema.parse(req.body);

    const makePerfil = makeCreatePerfilInfo();
    await makePerfil.execute({
      owner_id,
      status_member,
      delivery_fee,
      delivery_time,
      total_exchanges,
    });
  } catch (error) {
    if (error instanceof PerfilInfoAlreadyExistError) {
      return reply.status(409).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
