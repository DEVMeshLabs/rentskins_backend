import { FastifyInstance } from "fastify";
import { createConfigurationController } from "./createConfigurationController";
import { getManyConfigurationController } from "./getManyConfigurationController";
import { getConfigurationController } from "./getConfigurationController";

export async function configurationRouter(app: FastifyInstance) {
  app.post("/v1/configuration", createConfigurationController);
  app.get("/v1/configuration", getManyConfigurationController);
  app.get("/v1/configuration/:id", getConfigurationController);
}
