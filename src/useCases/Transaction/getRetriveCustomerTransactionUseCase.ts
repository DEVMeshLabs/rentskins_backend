import { customers } from "@/server";

export class GetRetriveCustomerTransactionUseCase {
  async process(id: string) {
    const retrive = await customers.retrieve(id);
    return retrive;
  }
}
