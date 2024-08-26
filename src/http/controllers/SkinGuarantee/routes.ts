import { FastifyInstance } from "fastify";
import { getManySkinGuaranteeSendController } from "./getManySkinGuaranteeSendController";
import { updateByIdSkinGuaranteeSendController } from "./updateByIdSkinGuaranteeController";

export async function skinGuaranteeRouter(app: FastifyInstance) {
  app.get("/v1/skins/guarantee", getManySkinGuaranteeSendController);
  app.patch("/v1/skins/guarantee/:id", updateByIdSkinGuaranteeSendController);
}
