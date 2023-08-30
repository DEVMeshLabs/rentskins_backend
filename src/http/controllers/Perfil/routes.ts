import { FastifyInstance } from "fastify";
import { getUserPerfilController } from "./getUserPerfilController";
import { updatePerfilController } from "./updatePerfilController";
import { deletePerfilController } from "./deletePerfilController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { getPerfilController } from "./getPerfilController";
import { dateController } from "./dateController";
import { getManyPerfilController } from "./getManyPerfilController";
import { getManyTypeUserController } from "./getManyTypeUserController";
import { createPerfilDateController } from "./createPerfilController";
import { getStatusPerfilController } from "./getStatusPerfilController";

export async function perfilRouter(app: FastifyInstance) {
  app.get("/v1/perfil/user", getManyTypeUserController);
  app.get("/v1/perfil/user/:owner_id", getUserPerfilController);
  app.get("/v1/perfil/:id", getPerfilController);
  app.get("/v1/perfil", getManyPerfilController);
  app.get("/v1/perfil/status/:owner_id", getStatusPerfilController);

  app.post("/v1/perfil", { onRequest: verifyJwt }, createPerfilDateController);
  app.post(
    "/v1/perfil/data/:owner_id",
    { onRequest: verifyJwt },
    dateController
  );
  app.put("/v1/perfil/:id", { onRequest: verifyJwt }, updatePerfilController);
  app.delete("/v1/perfil/:id", deletePerfilController);
}
