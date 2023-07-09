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
    throw new Error();
  }
}
