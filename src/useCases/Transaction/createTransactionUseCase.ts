import { ITransactionRepository } from "@/repositories/interface/ITransactionRepository";
import { PagarMeProvider } from "./PagarMeProvider";

interface ITransactionRepositoryRequest {
  owner_id: string;
  total: string;
  payment_type: any;
  installments: number;
  transaction_id: string;
  processor_response: string;
  customer_mobile: string;
  customer_email: string;
  customer_document: string;
  customer_name: string;
  billing_address: string;
  billing_city: string;
  billing_neighborhood: string;
  billing_number: string;
  billing_zip_code: string;
  billing_state: string;
  credit_cart_Number: string;
  credit_cart_Holder_name: string;
  credit_cart_Expiration: string;
  credit_cart_Cvv: string;
}

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
