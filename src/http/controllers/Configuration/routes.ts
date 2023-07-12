import { FastifyInstance } from "fastify";
import { createConfigurationController } from "./createConfigurationController";
import { getManyConfigurationController } from "./getManyConfigurationController";
import { getConfigurationController } from "./getConfigurationController";
import { getUserConfigurationController } from "./getUserConfigurationController";

export async function configurationRouter(app: FastifyInstance) {
  app.post("/v1/configuration", createConfigurationController);
  app.get("/v1/configuration", getManyConfigurationController);
  app.get("/v1/configuration/:id", getConfigurationController);
  app.get("/v1/configuration/user/:owner_id", getUserConfigurationController);
}
