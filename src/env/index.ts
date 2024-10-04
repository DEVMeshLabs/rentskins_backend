import "dotenv/config";
import { z } from "zod";

// Validando as variaveis de abiente

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  STEAM_KEY: z.string(),
  STRIPE_PUBLIC_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_SECRET_WEBHOOK_KEY: z.string(),
  MERCADO_SECRET_KEY: z.string(),
  KEY_STEAM_WEB_API: z.string(),
  MAIL_FROM: z.string(),
  MAIL_SENDGRID_API_KEY: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}
export const env = _env.data;
