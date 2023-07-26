import { FastifyRequest, FastifyReply } from "fastify";
import { createTransactionSchema } from "./Schemas/createTransactionSchema";
import { makeCreateTransactionUseCase } from "@/useCases/factories/Transaction/makeCreateTransactionUseCase";

export async function createTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  // owner_id,
  //     owner_name,
  //     owner_email,
  //     owner_cpf,
  //     payment_type,
  //     installments,
  //     credit_cart_Number,
  //     credit_cart_Holder_name,
  //     credit_cart_Expiration,
  //     credit_cart_Cvv,
  // billing_address: string
  // billing_number: string
  // billing_neighborhood: string
  // billing_city: string
  // billing_state: string
  // billing_zip_code: string
  // billing_state: string
  // customer_name: string
  // customer_email: string
  // customer_mobile: string
  // customer_document: string

  try {
    const {
      owner_id,
      payment_type,
      installments,
      processor_response,
      transaction_id,
      customer_mobile,
      customer_email,
      customer_document,
      billing_address,
      billing_city,
      billing_neighborhood,
      billing_number,
      billing_zip_code,
      billing_state,
    } = await createTransactionSchema.validate(req.body);

    const transactionUseCase = makeCreateTransactionUseCase();
    const createTransaction = await transactionUseCase.execute({
      owner_id,
      payment_type,
      installments,
      transaction_id,
      processor_response,
      customer_mobile,
      customer_email,
      customer_document,
      billing_address,
      billing_city,
      billing_neighborhood,
      billing_number,
      billing_zip_code,
      billing_state,
    });

    return reply.status(200).send(createTransaction);
  } catch (error) {
    return reply.status(404).send({ error: error.message });
  }
}
