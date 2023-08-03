import { FastifyInstance } from "fastify";
import { createPerfilDateController } from "../Perfil/createPerfilDateSteamUserController";

export async function steamRouter(app: FastifyInstance) {
  app.post("/v1/steam/date/:id", createPerfilDateController);
}
