import { FastifyRequest, FastifyReply } from "fastify";
// import { createTransactionSchema } from "./Schemas/createTransactionSchema";
import { makeCreateTransactionUseCase } from "@/useCases/@factories/Transaction/makeCreateTransactionUseCase";
import { CreatePlanRequest } from "pagarmeapisdklib";
// import { parsePhoneNumber } from "libphonenumber-js";

export async function createTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
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
  // try {
  //   const {
  //     owner_id,
  //     payment_type,
  //     installments,
  //     total,
  //     processor_response,
  //     transaction_id,
  //     customer_name,
  //     customer_mobile,
  //     customer_email,
  //     customer_document,
  //     billing_address,
  //     billing_city,
  //     billing_neighborhood,
  //     billing_number,
  //     billing_zip_code,
  //     billing_state,
  //     credit_cart_Number,
  //     credit_cart_Holder_name,
  //     credit_cart_Expiration,
  //     credit_cart_Cvv,
  //   } = await createTransactionSchema.validate(req.body);
  //   const transactionUseCase = makeCreateTransactionUseCase();
  //   const createTransaction = await transactionUseCase.execute({
  //     owner_id,
  //     payment_type,
  //     installments,
  //     transaction_id,
  //     total,
  //     processor_response,
  //     customer_name,
  //     customer_mobile: parsePhoneNumber(customer_mobile, "BR").format("E.164"),
  //     customer_email,
  //     customer_document,
  //     billing_address,
  //     billing_city,
  //     billing_neighborhood,
  //     billing_number,
  //     billing_zip_code,
  //     billing_state,
  //     credit_cart_Number,
  //     credit_cart_Holder_name,
  //     credit_cart_Expiration,
  //     credit_cart_Cvv,
  //   });
  //   return reply.status(200).send(createTransaction);
  // } catch (error) {
  //   return reply.status(404).send({ error: error.message });
  // }

  const body: CreatePlanRequest = {
    name: "name6",
    description: "description4",
    statementDescriptor: "statement_descriptor6",
    items: [
      {
        name: "name3",
        pricingScheme: {
          schemeType: "scheme_type5",
        },
        id: "id3",
        description: "description3",
      },
    ],
    shippable: false,
    paymentMethods: ["payment_methods9"],
    installments: [207],
    currency: "currency6",
    interval: "interval6",
    intervalCount: 170,
    billingDays: [201, 200],
    billingType: "billing_type0",
    pricingScheme: {
      schemeType: "scheme_type2",
    },
    metadata: {
      key0: "metadata7",
      key1: "metadata8",
    },
  };

  const transactionUseCase = makeCreateTransactionUseCase();
  const createTransaction = await transactionUseCase.execute(body);
  return reply.send(createTransaction);
}
