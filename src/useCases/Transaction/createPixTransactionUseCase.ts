import { env } from "@/env";
import axios from "axios";

export class CreatePixTransactionUseCase {
  async execute(owner_id: string, amount: number, description: string) {
    // const items = [
    //   {
    //     id: owner_id,
    //     title: "Cash",
    //     description: "Adicionando fundos na carteira",
    //     picture_url:
    //       "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png",
    //     category_id: "electronics",
    //     quantity: 1,
    //     unit_price: amount,
    //     type: "electronics",
    //     event_date: new Date(),
    //     category_descriptor: {
    //       passenger: {},
    //       route: {},
    //     },
    //   },
    // ];

    // const payer = {
    //   first_name: "Test",
    //   last_name: "Test",
    //   phone: {
    //     area_code: 11,
    //     number: "987654321",
    //   },
    //   address: {},
    // };

    // const shipments = {
    //   receiver_address: {
    //     zip_code: "12312-123",
    //     state_name: "Rio de Janeiro",
    //     city_name: "Buzios",
    //     street_name: "Av das Nacoes Unidas",
    //     street_number: 3003,
    //   },
    // };

    const response = axios
      .post(
        "https://api.mercadopago.com/v1/payments",
        {
          description: "Payment for product",
          external_reference: "MP0001",
          installments: 1,
          metadata: {},
          payer: {
            entity_type: "individual",
            type: "customer",
            email: "italovital21@gmail.com",
            identification: {
              type: "CPF",
              number: "71495354458",
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

    return response;
  }
}

// curl -X POST \
//       'https://api.mercadopago.com/v1/payments' \
//        -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
//        -H 'Content-Type: application/json' \
//       -d '{
//   "additional_info": {
//     "items": [
//       {
//         "id": "MLB2907679857",
//         "title": "Point Mini",
//         "description": "Point product for card payments via Bluetooth.",
//         "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png",
//         "category_id": "electronics",
//         "quantity": 1,
//         "unit_price": 58.8,
//         "type": "electronics",
//         "event_date": "2023-12-31T09:37:52.000-04:00",
//         "category_descriptor": {
//           "passenger": {},
//           "route": {}
//         }
//       }
//     ],
//     "payer": {
//       "first_name": "Test",
//       "last_name": "Test",
//       "phone": {
//         "area_code": 11,
//         "number": "987654321"
//       },
//       "address": {}
//     },
//     "shipments": {
//       "receiver_address": {
//         "zip_code": "12312-123",
//         "state_name": "Rio de Janeiro",
//         "city_name": "Buzios",
//         "street_name": "Av das Nacoes Unidas",
//         "street_number": 3003
//       }
//     }
//   },
//   "description": "Payment for product",
//   "external_reference": "MP0001",
//   "installments": 1,
//   "metadata": {},
//   "payer": {
//     "entity_type": "individual",
//     "type": "customer",
//     "email": "test_user_123@testuser.com",
//     "identification": {
//       "type": "CPF",
//       "number": "95749019047"
//     }
//   },
//   "payment_method_id": "master",
//   "token": "ff8080814c11e237014c1ff593b57b4d",
//   "transaction_amount": 58.8
// }'
