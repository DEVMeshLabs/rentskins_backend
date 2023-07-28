import * as Yup from "yup";
import { cpf } from "cpf-cnpj-validator";
import { parsePhoneNumber } from "libphonenumber-js";

export const createTransactionSchema = Yup.object({
  owner_id: Yup.string().required(),
  processor_response: Yup.string(),
  transaction_id: Yup.string(),
  payment_type: Yup.mixed().oneOf(["billet", "credit_card"]).required(),
  total: Yup.number().required(),
  installments: Yup.number()
    .min(1)
    .when("payment_type", {
      is: "credit_card",
      then: (schema) => schema.max(12),
      otherwise: (schema) => schema.max(1),
    }),
  customer_name: Yup.string().min(3),
  customer_email: Yup.string().required().email(),
  customer_mobile: Yup.string()
    .required()
    .test("is-valid-mobile", (value) =>
      parsePhoneNumber(value, "BR").isValid()
    ),
  customer_document: Yup.string()
    .required()
    .test("is-valid-document", (value) => cpf.isValid(value)),
  billing_address: Yup.string().required(),
  billing_state: Yup.string().required(),
  billing_number: Yup.string().required(),
  billing_neighborhood: Yup.string().required(),
  billing_city: Yup.string().required(),
  billing_zip_code: Yup.string().required(),
  credit_cart_Number: Yup.string().when("payment_type", {
    is: "credit_card",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  credit_cart_Expiration: Yup.string().when("payment_type", {
    is: "credit_card",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  credit_cart_Holder_name: Yup.string().when("payment_type", {
    is: "credit_card",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  credit_cart_Cvv: Yup.string().when("payment_type", {
    is: "credit_card",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
});
