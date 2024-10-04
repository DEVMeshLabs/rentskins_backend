import { FastifyInstance } from "fastify";
import { createSkinToCartController } from "./createSkinToCartController";
import { getSkinToCartController } from "./getSkinToCartController";
import { deleteSkinToCartController } from "./deleteSkinToCartController";

export async function skinToCartRouter(app: FastifyInstance) {
  app.post("/v1/skincart", createSkinToCartController);
  app.get("/v1/skincart/:id", getSkinToCartController);
  app.delete("/v1/skincart/:id", deleteSkinToCartController);
}
