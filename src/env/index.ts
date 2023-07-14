import "dotenv/config";
import { z } from "zod";

// Validando as variaveis de abiente

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(4444),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

// retorna o valor da variaveis
export const env = _env.data;
