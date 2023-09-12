/* eslint-disable no-case-declarations */

import { customers } from "@/server";

export class CreateWebHookTransactionUseCase {
  async process(event: any) {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;

        const customer = await customers.retrieve(
          paymentIntentSucceeded.customer
        );
        console.log(customer);
        return paymentIntentSucceeded;

      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object;
        return paymentIntentFailed;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
}
