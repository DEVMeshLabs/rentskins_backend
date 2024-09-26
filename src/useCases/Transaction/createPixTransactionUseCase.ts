import { env } from "@/env";
import { generateProductHash } from "@/utils/generateProductHash";
import axios from "axios";
// import axios from "axios";

export class CreatePixTransactionUseCase {
  async execute(owner_id: string, amount: number, cpf: string, email: string) {
    const response = axios
      .post(
        "https://api.mercadopago.com/v1/payments",
        {
          description: "",
          external_reference: generateProductHash(),
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
        console.log(err.response.data.cause);
      });

    return response;
  }
}
