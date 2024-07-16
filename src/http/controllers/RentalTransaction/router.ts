import { FastifyInstance } from "fastify";
import { createRentalTransactionController } from "./createRentalTransactionController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { getManyRentalTransactionController } from "./getManyRentalTransactionController";

export async function rentalTransactionRouter(app: FastifyInstance) {
  app.post(
    "/v1/rentalTransaction",
    { onRequest: verifyJwt },
    createRentalTransactionController
  );

  app.get("/v1/rentalTransaction", getManyRentalTransactionController);
}
