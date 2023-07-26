import { cpf } from "cpf-cnpj-validator";
import { type } from "os";

export class PagarMeProvider {
  async process({
    owner_id,
    owner_name,
    owner_email,
    owner_cpf,
    payment_type,
    installments,
    transaction_id,
    total,
    processor_response,
    credit_cart_Number,
    credit_cart_Holder_name,
    credit_cart_Expiration,
    credit_cart_Cvv,
    items,
  }) {
    const billetParams = {
      payment_method: "boleto",
      amount: total * 100,
      installments: 1,
    };

    const creditCardParams = {
      payment_method: "credit_card",
      amount: total * 100,
      installments,
      card_number: credit_cart_Number.replace(/[^?0-9]/g, ""),
      card_expiration_date: credit_cart_Expiration.replace(/[^?0-9]/g, ""),
      card_cvv: credit_cart_Cvv,
      capture: true,
    };

    let paymentParams;

    switch (payment_type) {
      case "credit_card":
        paymentParams = creditCardParams;
        break;
      case "billet":
        paymentParams = billetParams;
        break;
      default:
        throw new Error(`PaymentType ${payment_type} not found`);
    }

    const customerParams = {
      customer: {
        external_id: owner_id,
        name: owner_name,
        email: owner_email,
        type: "individual",
        country: "br",
      },
      documents: [{ type: owner_cpf }],
    };

    const transactionParams = {};
  }
}
