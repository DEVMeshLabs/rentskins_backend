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
import { getManyCartController } from "./getManySellerController";
import { getFloatSkinController } from "./getFloatSkinController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { getHistoricSellerController } from "./getHistoricSellerController";
import { getManySearchController } from "./getManySearchController";

export async function skinRouter(app: FastifyInstance) {
  app.get("/v1/skins", getSkinManyController);
  app.get("/v1/skins/:id", getSkinController);
  app.get("/v1/skins/seller/:seller_id", getSkinSellerController);
  app.get("/v1/skins/seller/user/:seller_id", getManyCartController);
  app.get("/v1/skins/weapon/:weapon", getManyWeaponController);
  app.get("/v1/skins/category/:category", getManyCategoryController);
  app.get("/v1/skins/search/:name", getManySearchController);
  app.get("/v1/skins/historic/:seller_id", getHistoricSellerController);

  app.post("/v1/skins", { onRequest: verifyJwt }, createSkinController);
  app.post(
    "/v1/skins/inventory/:id",
    { onRequest: verifyJwt },
    getInventoryController
  );
  app.post(
    "/v1/skins/float/:id",
    { onRequest: verifyJwt },
    getFloatSkinController
  );
  app.delete("/v1/skins/:id", { onRequest: verifyJwt }, deleteSkinController);
  app.put("/v1/skins/:id", { onRequest: verifyJwt }, updateSkinController);
}
