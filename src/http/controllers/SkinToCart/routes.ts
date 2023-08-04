import { FastifyInstance } from "fastify";
import { createSkinToCartController } from "./createSkinToCartController";

export async function skinToCartRouter(app: FastifyInstance) {
  app.post("/v1/skincart", createSkinToCartController);
}
