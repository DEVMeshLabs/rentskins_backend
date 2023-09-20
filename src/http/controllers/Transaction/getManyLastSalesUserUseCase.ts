import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetManyLastSalesUserUseCase } from "@/useCases/@factories/Transaction/makeGetManyLastSalesUserUseCase";
import { TransactionNotExistError } from "@/useCases/@errors/Transaction/TransactionNotExistError";

export async function getManyLastSalesUserUseCase(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { seller_id } = req.params as { seller_id: string };

    const getManyLastSalesUser = makeGetManyLastSalesUserUseCase();
    const response = await getManyLastSalesUser.execute(seller_id);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof TransactionNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
