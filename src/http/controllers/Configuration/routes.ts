import { FastifyInstance } from "fastify";
import { createConfigurationController } from "./createConfigurationController";

export async function configurationRouter(app: FastifyInstance) {
  app.post("/v1/configuration", createConfigurationController);
}
