import { FastifyInstance } from "fastify";
import { getSkinController } from "./getSkinController";
import { getSkinManyController } from "./getSkinManyController";
import { getSkinSellerController } from "./getSkinSellerController";
import { createSkinController } from "./createSkinController";

export async function skinRouter(app: FastifyInstance) {
  app.post("/v1/skin", createSkinController);
  app.get("/v1/skin/:id", getSkinController);
  app.get("/v1/skin", getSkinManyController);
  app.get("/v1/skin/seller/:seller_id", getSkinSellerController);
}
