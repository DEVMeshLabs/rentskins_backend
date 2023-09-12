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
  async process({
    owner_id,
    email,
    amount,
    payment_method,
    success_url,
    cancel_url,
  }: IPayment) {
    const customer = await customers.create({
      email, // Substitua pelo e-mail do usuário
      metadata: {
        owner_id, // Exemplo de metadata com o ID do usuário
        // Outros dados de metadata
      },
    });

    console.log(customer.id);

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
      customer: customer.id,
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
