import { FastifyInstance } from "fastify";
import { getDateSteamUserController } from "./getDateSteamUserController";

export async function steamRouter(app: FastifyInstance) {
  app.get("/v1/steam/date/:id", getDateSteamUserController);
}
