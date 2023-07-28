import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { PagarMeProvider } from "./PagarMeProvider";
import { ValueInvalidError } from "../@errors/Transaction/ValueInvalidError";
import { ITransactionRepositoryRequest } from "@/@types/ITransactionRepositoryRequest";

export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private paymentProvider: any
  ) {
    this.paymentProvider = paymentProvider || new PagarMeProvider();
  }

  async execute({
    owner_id,
    total,
    payment_type,
    installments,
    transaction_id,
    processor_response,
    customer_mobile,
    customer_email,
    customer_name,
    customer_document,
    billing_address,
    billing_city,
    billing_neighborhood,
    billing_number,
    billing_zip_code,
    billing_state,
    credit_cart_Number,
    credit_cart_Holder_name,
    credit_cart_Expiration,
    credit_cart_Cvv,
  }: ITransactionRepositoryRequest) {
    if (total <= 0) {
      throw new ValueInvalidError();
    }

    const createTransaction = await this.transactionRepository.create({
      owner_id,
      total,
      payment_type,
      installments,
      status: "started",
      transaction_id,
      processor_response,
      customer_name,
      customer_mobile,
      customer_email,
      customer_document,
      billing_address,
      billing_state,
      billing_city,
      billing_neighborhood,
      billing_number,
      billing_zip_code,
    });

    this.paymentProvider.process({
      owner_id,
      payment_type,
      installments,
      total,
      transaction_id,
      customer_mobile,
      customer_email,
      customer_name,
      customer_document,
      billing_address,
      billing_city,
      billing_neighborhood,
      billing_number,
      billing_zip_code,
      billing_state,
      processor_response,
      credit_cart_Number,
      credit_cart_Holder_name,
      credit_cart_Expiration,
      credit_cart_Cvv,
    });

    return createTransaction;
  }
}
