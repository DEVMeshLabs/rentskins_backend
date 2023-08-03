import { FastifyInstance } from "fastify";
import { getUserPerfilController } from "./getUserPerfilController";
import { updatePerfilController } from "./updatePerfilController";
import { deletePerfilController } from "./deletePerfilController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { getPerfilController } from "./getPerfilController";
import { createPerfilDateController } from "./createPerfilDateSteamUserController";

export async function perfilRouter(app: FastifyInstance) {
  app.post("/v1/perfil", createPerfilDateController);
  app.addHook("onRequest", verifyJwt);
  app.get("/v1/perfil/user/:owner_id", getUserPerfilController);
  app.get("/v1/perfil/:id", getPerfilController);
  app.put("/v1/perfil/:id", updatePerfilController);
  app.delete("/v1/perfil/:id", deletePerfilController);
}
