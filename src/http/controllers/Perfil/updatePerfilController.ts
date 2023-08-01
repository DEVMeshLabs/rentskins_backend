import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { makeUpdatePerfil } from "@/useCases/@factories/Perfil/makeUpdatePerfil";
import { FastifyRequest, FastifyReply } from "fastify";
import { updatePerfilInfoSchema } from "./Schemas/updatePerfilSchema";

export async function updatePerfilController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  const {
    delivery_fee,
    delivery_time,
    owner_id,
    status_member,
    total_exchanges,
  } = updatePerfilInfoSchema.parse(req.body);

  try {
    const getUserPerfilInfoUserUseCase = makeUpdatePerfil();
    const perfil = await getUserPerfilInfoUserUseCase.execute(id, {
      delivery_fee,
      delivery_time,
      owner_id,
      status_member,
      total_exchanges,
    });
    return reply.status(200).send(perfil);
  } catch (error) {
    if (error instanceof PerfilNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
