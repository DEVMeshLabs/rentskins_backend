import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { createTransactionRentalController } from "./createTransactionRentalController";
import { getManyTransactionRentalController } from "./getManyTransactionRentalController";
import { getManyUserTransactionRentalController } from "./getManyUserTransactionRentalController";

export async function rentalTransactionRouter(app: FastifyInstance) {
  app.post(
    "/v1/rentalTransaction",
    { onRequest: verifyJwt },
    createTransactionRentalController
  );

  app.get("/v1/rentalTransaction", getManyTransactionRentalController);
  app.get(
    "/v1/rentalTransaction/:steamId",
    getManyUserTransactionRentalController
  );
}
