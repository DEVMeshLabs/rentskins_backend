import { FastifyInstance } from "fastify";
import { createCartController } from "./createCartController";
import { getManyCartController } from "./getManyCartController";
import { getCartController } from "./getCartController";

export async function cartRouter(app: FastifyInstance) {
  app.post("/v1/cart", createCartController);
  app.get("/v1/cart", getManyCartController);
  app.get("/v1/cart/:id", getCartController);
}
