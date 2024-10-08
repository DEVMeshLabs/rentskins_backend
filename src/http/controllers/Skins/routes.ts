import { FastifyInstance } from "fastify";
import { getSkinController } from "./getSkinController";
import { getSkinManyController } from "./getSkinManyController";
import { getSkinSellerController } from "./getSkinSellerController";
import { createSkinController } from "./createSkinController";
import { deleteSkinController } from "./deleteSkinController";
import { getManyWeaponController } from "./getManyWeaponController";
import { getManyCategoryController } from "./getManyCategoryController";
import { updateSkinController } from "./updateSkinController";
import { getManyCartController } from "./getManySellerController";
import { getFloatSkinController } from "./getFloatSkinController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { getManySearchController } from "./getManySearchController";
import { getInventoryManyUserController } from "./getInventoryManyUserController";
import { getInventoryUserController } from "./getInventoryUserController";
import { getAlreadyExistSkinInventory } from "./getAlreadyExistSkinInventory";
import { getMedianPriceController } from "./getMedianPriceController";
import { getLastSellerSkinsController } from "./getLastSellerSkinsController";
import { getSkinSlugController } from "./getSkinSlugController";
import axios from "axios";
import { env } from "@/env";

export async function skinRouter(app: FastifyInstance) {
  app.get("/v1/skins", getSkinManyController);
  app.get("/v1/skins/:id", getSkinController);
  app.get("/v1/skins/seller/:seller_id", getSkinSellerController);
  app.get("/v1/skins/seller/user/:seller_id", getManyCartController);
  app.get("/v1/skins/weapon/:weapon", getManyWeaponController);
  app.get("/v1/skins/category/:category", getManyCategoryController);
  app.get("/v1/skins/search/:name", getManySearchController);
  app.get("/v1/skins/inventory/:id", getInventoryUserController);
  app.get("/v1/skins/slug/:slug", getSkinSlugController);

  app.post("/v1/skins/median/price", getMedianPriceController);
  app.post("/v1/skins/availability/:id", getAlreadyExistSkinInventory);
  app.post("/v1/skins", { onRequest: [verifyJwt] }, createSkinController);
  app.post("/v1/skins/lastsales", getLastSellerSkinsController);
  app.post("/v1/skins/float", getFloatSkinController);

  app.post(
    "/v1/skins/inventory/:id",
    { onRequest: [verifyJwt] },
    getInventoryManyUserController
  );
  app.post(
    "/v1/skins/float/:id",
    { onRequest: [verifyJwt] },
    getFloatSkinController
  );
  app.delete("/v1/skins/:id", deleteSkinController);
  app.put("/v1/skins/:id", { onRequest: [verifyJwt] }, updateSkinController);
  app.get("/v1/test", async () => {
    try {
      const { data } = await axios.get(
        `https://api.steampowered.com/IEconService/GetTradeHistory/v1/?key=${env.KEY_STEAM}&max_trades=50&get_descriptions=false&language=EN&include_failed=true&include_total=true`
      );
      return data;
    } catch (error) {
      return error;
    }
  });
}
