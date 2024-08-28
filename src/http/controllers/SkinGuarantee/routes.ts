import { FastifyInstance } from "fastify";
import { getManySkinGuaranteeSendController } from "./getManySkinGuaranteeSendController";
import { updateByIdSkinGuaranteeSendController } from "./updateByIdSkinGuaranteeController";
import { getManyAssetsSkinGuaranteeController } from "./getManyAssetsSkinGuaranteeController";

export async function skinGuaranteeRouter(app: FastifyInstance) {
  app.get("/v1/skins/guarantee", getManySkinGuaranteeSendController);
  app.post("/v1/skins/assets/guarantee", getManyAssetsSkinGuaranteeController);
  app.patch("/v1/skins/guarantee/:id", updateByIdSkinGuaranteeSendController);
}
