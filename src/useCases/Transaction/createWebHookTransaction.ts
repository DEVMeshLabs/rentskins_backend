/* eslint-disable no-case-declarations */
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { customers } from "@/server";

export class CreateWebHookTransactionUseCase {
  constructor(private walletRepository: IWalletRepository) {}
  async process(event: any) {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;

        // Pegando o customer
        const customer = await customers.retrieve(
          paymentIntentSucceeded.customer
        );

        // Atualizando a wallet
        await this.walletRepository.updateByUserValue(
          customer.metadata.owner_id,
          "increment",
          paymentIntentSucceeded.amount / 100
        );

        return paymentIntentSucceeded;

      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object;
        return paymentIntentFailed;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
}
