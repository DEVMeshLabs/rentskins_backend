import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InsufficientFundsError } from "@/useCases/@errors/Wallet/InsufficientFundsError";
import { WalletNotExistsError } from "@/useCases/@errors/Wallet/WalletNotExistsError";
import { makeCreateWithdrawnlRequestUseCase } from "@/useCases/@factories/WithdrawnlRequest/makeCreateWithdrawlRequestUseCase";
import { createWithdrawlRequestSchema } from "./Schema/createSchema";
import { AlreadyHaveWithdrawalRequest } from "@/useCases/@errors/WithdrawalRequest/alreadyHaveWithdrawalRequest";

export async function createWithdrawlRequestController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    // Validação do corpo da requisição
    const { owner_id, amount, pix_key, pix_key_type } =
      createWithdrawlRequestSchema.parse(req.body);

    const createWithdrawlRequest = makeCreateWithdrawnlRequestUseCase();
    await createWithdrawlRequest.execute({
      owner_id,
      amount,
      pix_key,
      pix_key_type,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return reply
        .status(400)
        .send({ message: "Erro de validação", errors: error.errors });
    }

    if (error instanceof WalletNotExistsError) {
      return reply.status(404).send({ errors: error.message });
    } else if (error instanceof InsufficientFundsError) {
      return reply.status(400).send({ errors: error.message });
    } else if (error instanceof AlreadyHaveWithdrawalRequest) {
      return reply.status(400).send({ errors: error.message });
    }

    console.error(error);
    return reply.status(500).send({ message: "Erro interno do servidor" });
  }
}
