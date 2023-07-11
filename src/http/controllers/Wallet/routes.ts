import { FastifyInstance } from "fastify";
import { createWalletController } from "./createWalletController";
import { getWalletController } from "./getWalletController";
import { getManyWalletController } from "./getManyWalletController";
import { getWalletUserController } from "./getWalletUserController";
import { deleteWalletController } from "./deleteWalletController";
import { updateWalletValueController } from "./updateWalletValueController";

export async function walletRouter(app: FastifyInstance) {
  app.post("/v1/wallet", createWalletController);
  app.delete("/v1/wallet/:id", deleteWalletController);
  app.put("/v1/wallet/:id", updateWalletValueController);
  app.get("/v1/wallet", getManyWalletController);
  app.get("/v1/wallet/user/:owner_id", getWalletUserController);
  app.get("/v1/wallet/:id", getWalletController);
}
