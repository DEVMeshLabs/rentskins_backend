import { FastifyInstance } from "fastify";
import { createWalletController } from "./createWalletController";
import { getWalletController } from "./getWalletController";
import { getManyWalletController } from "./getManyWalletController";
import { getWalletUserController } from "./getWalletUserController";
import { deleteWalletController } from "./deleteWalletController";
import { updateWalletValueController } from "./updateWalletValueController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";

export async function walletRouter(app: FastifyInstance) {
  app.post("/v1/wallet", createWalletController);

  app.addHook("onRequest", verifyJwt);
  app.put("/v1/wallet/:owner_id", updateWalletValueController);
  app.delete("/v1/wallet/:id", deleteWalletController);
  app.get("/v1/wallet", getManyWalletController);
  app.get("/v1/wallet/user/:owner_id", getWalletUserController);
  app.get("/v1/wallet/:id", getWalletController);
}
