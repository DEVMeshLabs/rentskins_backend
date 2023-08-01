import { FastifyInstance } from "fastify";
import { createPerfilDateController } from "./createPerfilDateSteamUserController";

export async function steamRouter(app: FastifyInstance) {
  app.post("/v1/steam/date/:id", createPerfilDateController);
}
