import { FastifyInstance } from "fastify";
import { getSkinController } from "./getSkinController";
import { createSkinController } from "./skinsController";

export async function skinRouter(app: FastifyInstance) {
  app.post("/v1/skin", createSkinController);
  app.get("/v1/skin/:id", getSkinController);
}
