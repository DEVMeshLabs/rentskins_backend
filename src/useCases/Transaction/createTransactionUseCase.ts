import { Client, CreatePlanRequest, PlansController } from "pagarmeapisdklib";

// import { ValueInvalidError } from "../@errors/Transaction/ValueInvalidError";
// import { ITransactionRepositoryRequest } from "@/@types/ITransactionRepositoryRequest";
// const client = new Client({
//   serviceRefererName: "ServiceRefererName",
//   timeout: 0,
//   basicAuthUserName: "pk_EGZ4Nw9fZbFNxv5V",
//   basicAuthPassword: "",
// });

const client = new Client({
  serviceRefererName: "ServiceRefererName",
  timeout: 0,
  basicAuthUserName: "sk_zNkj7XrsNc2aPOxd",
  basicAuthPassword: "",
});

const plansController = new PlansController(client);

export class CreateTransactionUseCase {
  constructor() {}

  async execute(body: CreatePlanRequest): Promise<any> {
    try {
      const { result } = await plansController.createPlan(body);
      // Get more response info...
      // const { statusCode, headers } = httpResponse;
      console.log(result);
    } catch (error) {
      if (error) {
        console.log(error);
        // const { statusCode, headers } = error;
      }
    }

    // try {
    //   const transaction = await pagarme.transactions.create({
    //     amount: 1000,
    //     card_number: "4111111111111111",
    //     card_holder_name: "John Doe",
    //     card_expiration_date: "1223",
    //     card_cvv: "123",
    //   });
    //   console.log(transaction);
    // } catch (error) {
    //   console.error(error);
    // }
  }

  // async execute({
  //   owner_id,
  //   total,
  //   payment_type,
  //   installments,
  //   transaction_id,
  //   processor_response,
  //   customer_mobile,
  //   customer_email,
  //   customer_name,
  //   customer_document,
  //   billing_address,
  //   billing_city,
  //   billing_neighborhood,
  //   billing_number,
  //   billing_zip_code,
  //   billing_state,
  //   credit_cart_Number,
  //   credit_cart_Holder_name,
  //   credit_cart_Expiration,
  //   credit_cart_Cvv,
  // }: ITransactionRepositoryRequest) {
  //   if (total <= 0) {
  //     throw new ValueInvalidError();
  //   }

  //   const createTransaction = await this.transactionRepository.create({
  //     owner_id,
  //     total,
  //     payment_type,
  //     installments,
  //     status: "started",
  //     transaction_id,
  //     processor_response,
  //     customer_name,
  //     customer_mobile,
  //     customer_email,
  //     customer_document,
  //     billing_address,
  //     billing_state,
  //     billing_city,
  //     billing_neighborhood,
  //     billing_number,
  //     billing_zip_code,
  //   });

  //   this.paymentProvider.process({
  //     owner_id,
  //     payment_type,
  //     installments,
  //     total,
  //     transaction_id,
  //     customer_mobile,
  //     customer_email,
  //     customer_name,
  //     customer_document,
  //     billing_address,
  //     billing_city,
  //     billing_neighborhood,
  //     billing_number,
  //     billing_zip_code,
  //     billing_state,
  //     processor_response,
  //     credit_cart_Number,
  //     credit_cart_Holder_name,
  //     credit_cart_Expiration,
  //     credit_cart_Cvv,
  //   });

  //   return createTransaction;
  // }
}
