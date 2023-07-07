import "dotenv/config";
import { z } from "zod";

// Validando as variaveis de abiente

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"), // Essa variavel só pode ter esses tipos
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333), // Converte um valor para um numero
});

// SafeParse vai tentar validar o process.env
const _env = envSchema.safeParse(process.env);

// O _env.error.format() - Pega tudo que deu o erro e formata para um jeito mais simples de ver
if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());

  // O throw new Error vai quebrar a aplicação se ocorrer um erro no env
  throw new Error("Invalid environment variables");
}

// retorna o valor da variaveis
export const env = _env.data;
