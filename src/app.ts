import fastify from "fastify";
import { skinRouter } from "./http/controllers/Skins/routes";
import { walletRouter } from "./http/controllers/Wallet/routes";
import { configurationRouter } from "./http/controllers/Configuration/routes";
import { notificationRouter } from "./http/controllers/Notification/routes";
import { cartRouter } from "./http/controllers/Cart/routes";
import { transactionRouter } from "./http/controllers/Transaction/routes";
import { perfilRouter } from "./http/controllers/Perfil/routes";
import { skinToCartRouter } from "./http/controllers/SkinToCart/routes";
import { env } from "process";
import { ZodError } from "zod";

export const app = fastify();

app.register(skinRouter);
app.register(walletRouter);
app.register(configurationRouter);
app.register(notificationRouter);
app.register(cartRouter);
app.register(transactionRouter);
app.register(perfilRouter);
app.register(skinToCartRouter);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error" });
});
