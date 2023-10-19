import { env } from "@/env";
import axios from "axios";
// import axios from "axios";

export class CreatePixTransactionUseCase {
  async execute(owner_id: string, amount: number, cpf: string, email: string) {
    const response = axios
      .post(
        "https://api.mercadopago.com/v1/payments",
        {
          description: "Adicionando fundos na conta",
          external_reference: "MP0001",
          installments: 1,

          metadata: {
            id: owner_id,
          },
          payer: {
            entity_type: "individual",
            type: "customer",
            email,
            identification: {
              type: "CPF",
              number: cpf,
            },
          },
          payment_method_id: "pix",
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
        console.log(err.response.data.cause);
      });

    // const preference = new Preference(client);
    // const index = 0;
    // const response = preference
    //   .create({
    //     body: {
    //       items: [
    //         {
    //           id: `${index + 1}`,
    //           title: "Meu produto",
    //           quantity: 1,
    //           currency_id: "BRL",
    //           unit_price: 100,
    //         },
    //       ],
    //     },
    //   })
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log(error));

    return response;
  }
}
