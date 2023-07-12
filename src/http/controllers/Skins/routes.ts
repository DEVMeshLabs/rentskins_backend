import { FastifyInstance } from "fastify";
import { getSkinController } from "./getSkinController";
import { getSkinManyController } from "./getSkinManyController";
import { getSkinSellerController } from "./getSkinSellerController";
import { createSkinController } from "./createSkinController";
import { deleteSkinController } from "./deleteSkinController";
import { getManyWeaponController } from "./getManyWeaponController";
import { getManyCategoryController } from "./getManyCategoryController";
import { getInventoryController } from "./getInventoryUserController";
import { updateSkinController } from "./updateSkinController";

export async function skinRouter(app: FastifyInstance) {
  app.post("/v1/skins", createSkinController);
  app.get("/v1/skins", getSkinManyController);
  app.get("/v1/skins/:id", getSkinController);
  app.get("/v1/skins/seller/:seller_id", getSkinSellerController);
  app.get("/v1/skins/weapon/:weapon", getManyWeaponController);
  app.get("/v1/skins/category/:category", getManyCategoryController);
  app.get("/v1/skins/inventory/:id", getInventoryController);
  app.put("/v1/skins/:id", updateSkinController);
  app.delete("/v1/skins/:id", deleteSkinController);
}
