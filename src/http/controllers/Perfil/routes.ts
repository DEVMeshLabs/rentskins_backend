import { FastifyInstance } from "fastify";
import { getUserPerfilController } from "./getUserPerfilController";
import { updatePerfilController } from "./updatePerfilController";
import { deletePerfilController } from "./deletePerfilController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { getPerfilController } from "./getPerfilController";
import { createPerfilDateController } from "./createPerfilDateSteamUserController";
import { dateController } from "./dateController";

export async function perfilRouter(app: FastifyInstance) {
  app.get("/v1/perfil/user/:owner_id", getUserPerfilController);
  app.get("/v1/perfil/:id", getPerfilController);

  app.post("/v1/perfil", { onRequest: verifyJwt }, createPerfilDateController);
  app.post(
    "/v1/perfil/data/:owner_id",
    { onRequest: verifyJwt },
    dateController
  );
  app.put("/v1/perfil/:id", { onRequest: verifyJwt }, updatePerfilController);
  app.delete(
    "/v1/perfil/:id",
    { onRequest: verifyJwt },
    deletePerfilController
  );
}
