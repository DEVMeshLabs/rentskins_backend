import { FastifyInstance } from "fastify";
import { createCartController } from "./createCartController";

export async function cartRouter(app: FastifyInstance) {
  app.post("/v1/cart", createCartController);
}
