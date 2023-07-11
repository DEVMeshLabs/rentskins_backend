import { FastifyInstance } from "fastify";
import { createWalletController } from "./createWalletController";
import { getWalletController } from "./getWalletController";
import { getManyWalletController } from "./getManyWalletController";
import { getWalletUserController } from "./getWalletUserController";

export async function walletRouter(app: FastifyInstance) {
  app.post("/v1/wallet", createWalletController);
  app.get("/v1/wallet", getManyWalletController);
  app.get("/v1/wallet/user/:owner_id", getWalletUserController);
  app.get("/v1/wallet/:id", getWalletController);
}
