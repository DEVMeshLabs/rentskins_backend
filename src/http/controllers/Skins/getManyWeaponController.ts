import { WeaponNotExistError } from "@/useCases/errors/weaponNotExistError";
import { makeGetManyWeapon } from "@/useCases/factories/makeGetManyWeaponUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyWeaponController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { weapon } = req.params as { weapon: string };

  try {
    const getManyWeapon = makeGetManyWeapon();

    const findAll = await getManyWeapon.execute(weapon);
    return reply.status(200).send(findAll);
  } catch (error) {
    if (error instanceof WeaponNotExistError) {
      reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
