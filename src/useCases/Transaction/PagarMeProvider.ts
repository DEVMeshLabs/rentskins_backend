const stripe = require("stripe")(
  "pk_test_51MtcTFDc1nUAjpNxkGLHFtTtO2kifE7jXp5bTEmIxPtdhdclw0DBDD6MnCh5FKCMgHn0qpR6KahPEGJOvdsREtUz00Ra0tvyFK"
);

export class PagarMeProvider {
  async process() {
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 8,
        exp_year: 2024,
        cvc: "314",
      },
    });
    console.log("Deu certo!");
    return paymentMethod;
  }
}
