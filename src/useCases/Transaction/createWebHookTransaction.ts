/* eslint-disable no-case-declarations */
import { send } from "@/lib/nodemailer";
import { templateSendMail_1 } from "@/lib/templates/sendMail_1";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { customers } from "@/server";

export class CreateWebHookTransactionUseCase {
  constructor(
    private walletRepository: IWalletRepository,
    private notificationRepository: INotificationRepository
  ) {}

  async process(event: any) {
    try {
      const { type, data } = event;
      const paymentIntent = data.object;

      switch (type) {
        case "payment_intent.succeeded":
          return this.handlePaymentSucceeded(paymentIntent);

        case "payment_intent.payment_failed":
          return this.handlePaymentFailed(paymentIntent);

        default:
          console.log(`Unhandled event type ${type}`);
      }
    } catch (error) {
      console.error("Error processing webhook event:", error);
      throw new Error("Failed to process Stripe webhook event.");
    }
  }

  private async handlePaymentSucceeded(paymentIntent: any) {
    const { customer, amount, payment_method_types } = paymentIntent;
    const retrievedCustomer = await customers.retrieve(customer);
    console.log(retrievedCustomer);
    const amountInBRL = (amount / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    await Promise.all([
      this.walletRepository.updateByUserValue(
        retrievedCustomer.metadata.owner_id,
        "increment",
        amount / 100
      ),
      this.notificationRepository.create({
        owner_id: retrievedCustomer.metadata.owner_id,
        description: `O pagamento foi realizado com sucesso! ${amountInBRL} foram adicionados à sua conta.`,
      }),
    ]);
    const isPaymentMethodCard = payment_method_types[0] === "card";

    const html = templateSendMail_1({
      user: retrievedCustomer.metadata.owner_name || "Cliente",
      title: "Seu pagamento foi confirmado!",
      date: new Date().toLocaleDateString("pt-BR"),
      value: amountInBRL,
      paymentMethod: isPaymentMethodCard ? "Cartão de crédito" : "Pix",
    });

    const response = send(
      retrievedCustomer.email || "no-reply@domain.com",
      "Seu pagamento foi confirmado!",
      html
    );
    console.log(response);
    return paymentIntent;
  }

  private async handlePaymentFailed(paymentIntent: any) {
    const { customer } = paymentIntent;
    const retrievedCustomer = await customers.retrieve(customer);

    await this.notificationRepository.create({
      owner_id: retrievedCustomer.metadata.owner_id,
      description: `O pagamento falhou. Tente novamente mais tarde.`,
    });

    return paymentIntent;
  }
}
