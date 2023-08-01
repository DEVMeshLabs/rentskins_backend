import { FastifyInstance } from "fastify";
import { getUserPerfilController } from "./getUserPerfilController";
import { updatePerfilController } from "./updatePerfilController";
import { deletePerfilController } from "./deletePerfilController";
import { createPerfilDateController } from "../Steam/createPerfilDateSteamUserController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";

export async function perfilRouter(app: FastifyInstance) {
  app.post("/v1/perfil", createPerfilDateController);
  app.addHook("onRequest", verifyJwt);
  app.get("/v1/perfil/user/:owner_id", getUserPerfilController);
  app.get("/v1/perfil/:id", getUserPerfilController);
  app.put("/v1/perfil/:id", updatePerfilController);
  app.delete("/v1/perfil/:id", deletePerfilController);
}
