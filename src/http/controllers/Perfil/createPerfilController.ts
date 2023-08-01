import { makeCreatePerfil } from "@/useCases/@factories/Perfil/makeCreatePerfil";
import { FastifyRequest, FastifyReply } from "fastify";
import { createPerfilInfoSchema } from "./Schemas/createPerfilInfoSchema";
import { PerfilAlreadyExistError } from "@/useCases/@errors/Perfil/PerfilInfoAlreadyExistError";

export async function createPerfilController(
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

    const makePerfil = makeCreatePerfil();
    await makePerfil.execute({
      owner_id,
      status_member,
      delivery_fee,
      delivery_time,
      total_exchanges,
    });
  } catch (error) {
    if (error instanceof PerfilAlreadyExistError) {
      return reply.status(409).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
