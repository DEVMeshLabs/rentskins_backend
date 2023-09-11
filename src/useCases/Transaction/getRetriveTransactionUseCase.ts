import { checkout } from "@/server";

export class GetRetriveTransactionUseCase {
  async process(id: string) {
    const retrive = await checkout.sessions.retrieve(id);
    return retrive;
  }
}
