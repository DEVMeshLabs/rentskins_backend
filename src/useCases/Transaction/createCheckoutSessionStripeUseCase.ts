import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { checkout, customers } from "@/server";
import axios from "axios";
import { env } from "process";

interface IPayment {
  owner_id: string;
  email: string;
  amount: number;
  payment_method: string;
  cpf: string;
  success_url: string;
  cancel_url: string;
}

export class CreateCheckoutSessionStripeUseCase {
  constructor(private perfilRepostiory: IPerfilRepository) {}
  async process({
    owner_id,
    email,
    amount,
    cpf,
    payment_method,
    success_url,
    cancel_url,
  }: IPayment) {
    const perfilUser = await this.perfilRepostiory.findByUser(owner_id);
    let customer_id;

    const referencia = 1;
    if (perfilUser && perfilUser.stripe_id === null) {
      const customer = await customers.create({
        email,
        metadata: {
          owner_id,
          owner_name: perfilUser.owner_name,
        },
      });

      await this.perfilRepostiory.updateByIdUser(customer.metadata.owner_id, {
        stripe_id: customer.id,
      });

      customer_id = customer.id;
    } else {
      customer_id = perfilUser.stripe_id;
    }

    if (payment_method === "pix") {
      const response: any = axios
        .post(
          "https://api.mercadopago.com/v1/payments",
          {
            description: "Recarga de saldo",
            external_reference: `RT${referencia}`,
            installments: 1,
            metadata: {
              id: owner_id,
              owner_name: perfilUser.owner_name,
            },
            payer: {
              entity_type: "individual",
              type: "customer",
              email,
              owner_name: perfilUser.owner_name,
              identification: {
                type: "CPF",
                number: cpf,
              },
            },
            payment_method_id: "pix",
            notification_url:
              "https://rentskins-backend-r447.onrender.com/v1/transaction/webhook/pix?source_news=webhooks",
            transaction_amount: amount,
          },

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${env.MERCADO_SECRET_KEY}`,
            },
          }
        )
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
      const link = await response;
      const ticket = link.point_of_interaction.transaction_data.ticket_url;
      return ticket;
    }

    const session = await checkout.sessions.create({
      line_items: [
        {
          price_data: {
            unit_amount: amount * 100,
            currency: "brl",
            product: "prod_P3spuzJGzs7ivz",
          },
          quantity: 1,
        },
      ],
      metadata: {
        owner_id,
        owner_name: perfilUser.owner_name,
      },
      customer: customer_id,
      phone_number_collection: { enabled: true },
      billing_address_collection: "required",
      payment_method_types: [payment_method],
      success_url: `${success_url}/processo?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cancel_url}/cancelado`,
      mode: "payment",
    });

    return session.url;
  }
}
