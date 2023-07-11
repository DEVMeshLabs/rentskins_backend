import fastify from "fastify";
import { skinRouter } from "./http/controllers/Skins/routes";
import { walletRouter } from "./http/controllers/Wallet/routes";
import { env } from "process";
import { ZodError } from "zod";

export const app = fastify({ logger: true });

app.register(skinRouter);
app.register(walletRouter);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // Todo: Aqui a gente utilizaria uma ferramente externa
  }

  return reply.status(500).send({ message: "Internal server error" });
});
