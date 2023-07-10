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
  app.post("/v1/skin", createSkinController);
  app.get("/v1/skin", getSkinManyController);
  app.get("/v1/skin/:id", getSkinController);
  app.get("/v1/skin/seller/:seller_id", getSkinSellerController);
  app.get("/v1/skin/weapon/:weapon", getManyWeaponController);
  app.get("/v1/skin/category/:category", getManyCategoryController);
  app.get("/v1/skin/inventory/:id", getInventoryController);
  app.put("/v1/skin/:id", updateSkinController);
  app.delete("/v1/skin/:id", deleteSkinController);
}
