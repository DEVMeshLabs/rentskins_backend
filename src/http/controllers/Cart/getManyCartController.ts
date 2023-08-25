import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetManyCart } from "@/useCases/@factories/Cart/makeGetManyCartUseCase";

export async function getManyCartController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const makeGetMany = makeGetManyCart();
    const response = await makeGetMany.execute();
    return reply.status(200).send(response);
  } catch (error) {
    throw new Error();
  }
}
