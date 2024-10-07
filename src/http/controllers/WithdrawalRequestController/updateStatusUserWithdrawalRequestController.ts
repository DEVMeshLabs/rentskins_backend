import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateStatusUserWithdrawnlRequestUseCase } from "@/useCases/@factories/WithdrawnlRequest/makeUpdateStatusUserWithdrawnlRequestUseCase";
import { UpdateFailedError } from "@/useCases/@errors/Wallet/UpdateFailedError";
import { HasAlreadyBeenUpdated } from "@/useCases/@errors/WithdrawalRequest/hasAlreadyBeenUpdated";

export async function updateStatusUserWithdrawalRequestController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { owner_id, status } = req.body as {
      owner_id: string;
      status: "Approved" | "Rejected";
    };
    const updateStatus = makeUpdateStatusUserWithdrawnlRequestUseCase();
    const response = await updateStatus.execute(owner_id, status);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof UpdateFailedError) {
      return reply.status(400).send({ message: error.message });
    } else if (error instanceof HasAlreadyBeenUpdated) {
      return reply.status(400).send({ message: error.message });
    }
    return reply.status(500).send({ message: error });
  }
}
