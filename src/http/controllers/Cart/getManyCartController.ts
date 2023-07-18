import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetManyCart } from "@/useCases/factories/Cart/makeGetManyCartUseCase";

export async function getManyCartController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const makeGetMany = makeGetManyCart();
    const getMany = await makeGetMany.execute();
    return reply.status(200).send(getMany);
  } catch (error) {
    throw new Error();
  }
}
