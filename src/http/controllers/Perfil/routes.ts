import { FastifyInstance } from "fastify";
import { createPerfilInfoController } from "./createPerfilInfoController";
import { getUserPerfilInfoController } from "./getUserPerfilInfoController";

export async function perfilRouter(app: FastifyInstance) {
  app.post("/v1/perfil", createPerfilInfoController);
  app.get("/v1/perfil/:owner_id", getUserPerfilInfoController);
}
