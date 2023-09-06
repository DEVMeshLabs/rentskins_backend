import { env } from "@/env";
const { checkout } = require("stripe")(env.STRIPE_SECRET_KEY);

export class GetRetriveTransactionUseCase {
  async process(id: string) {
    const retrive = await checkout.sessions.retrieve(id);
    return retrive;
  }
}
