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
    steam_level,
    owner_type,
  } = updatePerfilInfoSchema.parse(req.body);

  try {
    const getUserPerfilInfoUserUseCase = makeUpdatePerfil();
    await getUserPerfilInfoUserUseCase.execute(id, {
      owner_id,
      owner_type,
      delivery_fee,
      delivery_time,
      status_member,
      steam_level,
    });
  } catch (error) {
    if (error instanceof PerfilNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }

  return reply.status(204).send();
}
