import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { makeUpdateUserPerfil } from "@/useCases/@factories/Perfil/makeUpdatePerfil";
import { FastifyRequest, FastifyReply } from "fastify";
import { updatePerfilInfoSchema } from "./Schemas/updatePerfilSchema";

export async function updatePerfilController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { id } = req.params as { id: string };

  const {
    owner_name,
    owner_type,
    owner_country,
    delivery_fee,
    delivery_time,
    status_member,
    account_status,
    total_exchanges,
    picture,
    steam_url,
    cart_id,
  } = updatePerfilInfoSchema.parse(req.body);

  try {
    const getUserPerfilInfoUserUseCase = makeUpdateUserPerfil();
    await getUserPerfilInfoUserUseCase.execute(id, {
      owner_type,
      owner_name,
      owner_country,
      delivery_fee,
      delivery_time,
      status_member,
      account_status,
      total_exchanges,
      picture,
      steam_url,
      cart_id,
    });
  } catch (error) {
    if (error instanceof PerfilNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }

  return reply.status(204).send();
}
