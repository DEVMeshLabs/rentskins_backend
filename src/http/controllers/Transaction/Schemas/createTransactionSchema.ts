import * as Yup from "yup";
import { cpf } from "cpf-cnpj-validator";

export const createCartSchema = Yup.object({
  owner_id: Yup.string().required(),
  owner_name: Yup.string().min(3).required(),
  owner_email: Yup.string().email().required(),
  owner_cpf: Yup.string()
    .required()
    .test("is-valid-document", (value) => cpf.isValid(value)),
  payment_type: Yup.mixed().oneOf(["billet", "credit_cart"]).required(),
  installments: Yup.number()
    .min(1)
    .when("payment_type", {
      is: "credit_cart",
      then: (schema) => schema.max(12),
      otherwise: (schema) => schema.max(1),
    }),
  credit_cart_Number: Yup.string().when("payment_type", {
    is: "credit_cart",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  credit_cart_Expiration: Yup.string().when("payment_type", {
    is: "credit_cart",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  credit_cart_Holder_name: Yup.string().when("payment_type", {
    is: "credit_cart",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  credit_cart_Cvv: Yup.string().when("payment_type", {
    is: "credit_cart",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
});
