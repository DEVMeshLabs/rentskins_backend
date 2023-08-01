import { FastifyInstance } from "fastify";
import { createConfigurationController } from "./createConfigurationController";
import { getManyConfigurationController } from "./getManyConfigurationController";
import { getConfigurationController } from "./getConfigurationController";
import { getUserConfigurationController } from "./getUserConfigurationController";
import { deleteConfigurationController } from "./deleteConfigurationController";
import { updateConfigurationController } from "./updateConfigurationController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";

export async function configurationRouter(app: FastifyInstance) {
  app.post("/v1/configuration", createConfigurationController);
  app.addHook("onRequest", verifyJwt);
  app.get("/v1/configuration", getManyConfigurationController);
  app.get("/v1/configuration/:id", getConfigurationController);
  app.get("/v1/configuration/user/:owner_id", getUserConfigurationController);
  app.put("/v1/configuration/:id", updateConfigurationController);
  app.delete("/v1/configuration/:id", deleteConfigurationController);
}
