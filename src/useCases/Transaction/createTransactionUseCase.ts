import { ICartRepository } from "@/repositories/interface/ICartRepository";
import { CreateTransactionError } from "../errors/Transaction/createTrasactionError";
import { ITransactionRepository } from "@/repositories/interface/ITransactionRepository";

interface ITransactionRepositoryRequest {
  owner_id: string;
  payment_type: any;
  installments: number;
  transaction_id: string;
  processor_response: string;
  customer_mobile: string;
  customer_email: string;
  customer_document: string;
  billing_address: string;
  billing_city: string;
  billing_neighborhood: string;
  billing_number: string;
  billing_zip_code: string;
  billing_state: string;
}

export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private cartRepository: ICartRepository
  ) {}

  async execute({
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
  }: ITransactionRepositoryRequest) {
    const findByCart = await this.cartRepository.findByBuyer(owner_id);

    if (!findByCart) {
      throw new CreateTransactionError();
    }

    const createTransaction = await this.transactionRepository.create({
      owner_id: findByCart.buyer_id,
      total: findByCart.price,
      payment_type,
      installments,
      status: "started",
      transaction_id,
      processor_response,
      customer_name: findByCart.buyer_name,
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

    return createTransaction;
  }
}
