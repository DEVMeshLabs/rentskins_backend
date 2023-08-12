export class PagarMeProvider {
  async process({
    owner_id,
    payment_type,
    installments,
    total,
    transaction_id,
    customer_mobile,
    customer_email,
    customer_name,
    customer_document,
    billing_address,
    billing_city,
    billing_neighborhood,
    billing_number,
    billing_zip_code,
    billing_state,
    credit_cart_Number,
    credit_cart_Holder_name,
    credit_cart_Expiration,
    credit_cart_Cvv,
  }) {
    // const billetParams = {
    //   payment_method: "boleto",
    //   amount: total * 100,
    //   installments: 1,
    // };
    // const creditCardParams = {
    //   payment_method: "credit_card",
    //   amount: total * 100,
    //   installments,
    //   card_holder_name: credit_cart_Holder_name,
    //   card_number: credit_cart_Number.replace(/[^?0-9]/g, ""),
    //   card_expiration_date: credit_cart_Expiration.replace(/[^?0-9]/g, ""),
    //   card_cvv: credit_cart_Cvv,
    //   capture: true,
    // };
    // let paymentParams;
    // switch (payment_type) {
    //   case "credit_card":
    //     paymentParams = creditCardParams;
    //     break;
    //   case "billet":
    //     paymentParams = billetParams;
    //     break;
    //   default:
    //     throw new Error(`PaymentType ${payment_type} not found`);
    // }
    // const customerParams = {
    //   customer: {
    //     external_id: owner_id,
    //     name: customer_name,
    //     email: customer_email,
    //     type: "individual",
    //     country: "br",
    //     phone_numbers: [customer_mobile],
    //   },
    //   documents: [
    //     {
    //       type: customer_document,
    //       number: customer_document.replace(/[^?0-9]/g, ""),
    //     },
    //   ],
    // };
    // const billingParams = billing_zip_code
    //   ? {
    //       billing: {
    //         name: "Billing Address",
    //         address: {
    //           country: "br",
    //           state: billing_state,
    //           city: billing_city,
    //           neighborhood: billing_neighborhood,
    //           street: "Mudar aqui",
    //           street_number: billing_number,
    //           zipcode: billing_zip_code.replace(/[^?0-9]/g, ""),
    //         },
    //       },
    //     }
    //   : {};
    // const itemsParams = {
    //   items: [
    //     {
    //       id: 1,
    //       title: "Deposit Amount",
    //       unit_price: total * 100,
    //       quantity: 1,
    //       tangible: false,
    //     },
    //   ],
    // };
    // const metadataParams = {
    //   metadata: {
    //     transaction_code: owner_id,
    //   },
    // };
    // const transactionParams = {
    //   async: false,
    //   // postback_url
    //   ...paymentParams,
    //   ...customerParams,
    //   ...billingParams,
    //   ...itemsParams,
    //   ...metadataParams,
    // };
    // const client = await pagarme.client.connect({
    //   api_key: "pk_EGZ4Nw9fZbFNxv5V",
    // });
    // await client.transaction.create(transactionParams);
  }
}
