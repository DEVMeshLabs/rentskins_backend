/* eslint-disable no-case-declarations */
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { customers } from "@/server";

export class CreateWebHookTransactionUseCase {
  constructor(
    private walletRepository: IWalletRepository,
    private notificationRepository: INotificationRepository
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

          await this.notificationRepository.create({
            owner_id: customer.metadata.owner_id,
            description: `O pagamento foi realizado com sucesso! ${(
              paymentIntentSucceeded.amount / 100
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
            })} foram adicionados a sua conta.`,
          }),
        ]);

        return paymentIntentSucceeded;

      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object;
        await this.notificationRepository.create({
          owner_id: customer.metadata.owner_id,
          description: `O pagamento falhou. Tente novamente mais tarde.`,
        });

        return paymentIntentFailed;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
}
