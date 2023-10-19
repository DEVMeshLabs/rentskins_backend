import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import axios from "axios";
import { env } from "process";

export class CreateWebHookPixUseCase {
  constructor(
    private notificationRepository: INotificationRepository,
    private walletRepository: IWalletRepository
  ) {}

  async execute(req: any) {
    if (req.body) {
      console.log(req.body);
      switch (req.body.type) {
        case "payment": {
          console.log("Tipo: pagamento");
          if (req.body.action === "payment.created") {
            console.log("Pix create");
          }
          if (req.body.action === "payment.updated") {
            console.log("Entrou ");
            const id = req.body.data.id;
            console.log(id);

            const getPayment: any = await axios
              .get(`https://api.mercadopago.com/v1/payments/${id}`, {
                headers: {
                  Authorization: `Bearer ${env.MERCADO_SECRET_KEY}`,
                },
              })
              .then((res) => res)
              .catch((err) => {
                console.log(err);
              });

            console.log(getPayment);
            if (getPayment.data.status === "approved") {
              await Promise.all([
                this.walletRepository.updateByUserValue(
                  getPayment.data.metadata.id,
                  "increment",
                  getPayment.data.transaction_details.total_paid_amount
                ),
                console.log(getPayment.data.status),

                // await this.notificationRepository.create({
                //   owner_id: customer.metadata.owner_id,
                //   description: `O pagamento foi realizado com sucesso! ${(
                //     paymentIntentSucceeded.amount / 100
                //   ).toLocaleString("pt-BR", {
                //     style: "currency",
                //     currency: "BRL",
                //     minimumFractionDigits: 2,
                //   })} foram adicionados a sua conta.`,
                // }),
              ]);
            }
          }
          break;
        }
      }
    }
  }
}
