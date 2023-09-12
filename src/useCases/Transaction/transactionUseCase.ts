import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { checkout, customers } from "@/server";

interface IPayment {
  owner_id: string;
  email: string;
  amount: number;
  payment_method: string;
  success_url: string;
  cancel_url: string;
}

export class TransactionUseCase {
  constructor(private perfilRepostiory: IPerfilRepository) {}
  async process({
    owner_id,
    email,
    amount,
    payment_method,
    success_url,
    cancel_url,
  }: IPayment) {
    const perfilUser = await this.perfilRepostiory.findByUser(owner_id);
    let customer_id;

    if (perfilUser.stripe_id === null) {
      const customer = await customers.create({
        email,
        metadata: {
          owner_id,
        },
      });

      await this.perfilRepostiory.updateByIdUser(customer.metadata.owner_id, {
        stripe_id: customer.id,
      });

      customer_id = customer.id;
    }

    customer_id = perfilUser.stripe_id;
    const session = await checkout.sessions.create({
      line_items: [
        {
          price_data: {
            unit_amount: amount * 100,
            currency: "brl",
            product: "prod_OXhZUN8oYYERyj",
          },
          quantity: 1,
        },
      ],
      metadata: {
        owner_id,
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
