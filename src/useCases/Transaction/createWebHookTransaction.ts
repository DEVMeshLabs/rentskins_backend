/* eslint-disable no-case-declarations */
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { customers } from "@/server";

export class CreateWebHookTransactionUseCase {
  constructor(
    private walletRepository: IWalletRepository,
    private perfilRepository: IPerfilRepository
  ) {}

  async process(event: any) {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;

        // Pegando o customer
        const customer = await customers.retrieve(
          paymentIntentSucceeded.customer
        );

        // Atualizando a wallet e Perfil
        await Promise.all([
          this.walletRepository.updateByUserValue(
            customer.metadata.owner_id,
            "increment",
            paymentIntentSucceeded.amount / 100
          ),
        ]);
        return paymentIntentSucceeded;

      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object;
        return paymentIntentFailed;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
}
