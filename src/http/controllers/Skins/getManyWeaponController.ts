import { makeGetManyWeapon } from "@/useCases/@factories/Skin/makeGetManyWeaponUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyWeaponController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { weapon } = req.params as { weapon: string };

  try {
    const getManyWeapon = makeGetManyWeapon();

    const response = await getManyWeapon.execute(weapon);

    return reply.status(200).send(response);
  } catch (error) {
    throw new Error();
  }
}
