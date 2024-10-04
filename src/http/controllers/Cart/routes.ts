import { FastifyInstance } from "fastify";
import { getManyCartController } from "./getManyCartController";
import { getCartController } from "./getCartController";
import { getCartBuyerController } from "./getCartBuyerController";
import { updateByIdCartController } from "./updateByIdCartController";
import { deleteCartController } from "./deleteCartController";

export async function cartRouter(app: FastifyInstance) {
  app.delete("/v1/cart/:id", deleteCartController);
  app.put("/v1/cart/:id", updateByIdCartController);
  app.get("/v1/cart", getManyCartController);
  app.get("/v1/cart/:id", getCartController);
  app.get("/v1/cart/buyer/:buyer_id", getCartBuyerController);
}
