import { z } from "zod";

// Schemas individuais para cada tipo de chave PIX
const cpfSchema = z.string().refine(
  (value) => {
    const cpfRegex = /^\d{11}$/;
    return cpfRegex.test(value);
  },
  { message: "CPF inválido. Deve conter 11 dígitos." }
);

const cnpjSchema = z.string().refine(
  (value) => {
    const cnpjRegex = /^\d{14}$/;
    return cnpjRegex.test(value);
  },
  { message: "CNPJ inválido. Deve conter 14 dígitos." }
);

const phoneSchema = z.string().refine(
  (value) => {
    const phoneRegex = /^\d{10,12}$/;
    return phoneRegex.test(value);
  },
  {
    message: "Número de telefone inválido. Deve ter entre 10 e 12 dígitos.",
  }
);

const emailSchema = z.string().email({ message: "Email inválido." });

const randomKeySchema = z
  .string()
  .max(32, { message: "Chave aleatória deve ter até 32 caracteres." });

// Função que valida a chave PIX de acordo com o tipo
export const createWithdrawlRequestSchema = z
  .object({
    owner_id: z.string(),
    amount: z.number().min(20, { message: "O valor mínimo é de R$ 20,00." }),
    pix_key: z.string(), // Primeiro validamos como string
    pix_key_type: z.enum(["email", "cpf", "cnpj", "phone", "random_key"]), // Define o tipo de chave PIX
  })
  .refine(
    (data) => {
      // Validação condicional com base no tipo de chave
      let result;
      switch (data.pix_key_type) {
        case "email":
          result = emailSchema.safeParse(data.pix_key);
          break;
        case "cpf":
          result = cpfSchema.safeParse(data.pix_key);
          break;
        case "cnpj":
          result = cnpjSchema.safeParse(data.pix_key);
          break;
        case "phone":
          result = phoneSchema.safeParse(data.pix_key);
          break;
        case "random_key":
          result = randomKeySchema.safeParse(data.pix_key);
          break;
        default:
          return false;
      }
      // Retorna true se a validação for bem-sucedida, ou falso com mensagem de erro específica
      if (!result.success) {
        throw new z.ZodError([
          {
            code: result.error.errors[0].code,
            message: result.error.errors[0].message,
            path: ["pix_key"],
          },
        ]);
      }
      return true;
    },
    {
      message: "A chave PIX não corresponde ao tipo selecionado.",
      path: ["pix_key"], // Define onde o erro será exibido
    }
  );
