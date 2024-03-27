import { FastifyInstance } from "fastify";
import { createRentalTransactionController } from "./createRentalTransactionController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";

export async function rentalTransactionRouter(app: FastifyInstance) {
  app.post(
    "/v1/rentalTransaction",
    { onRequest: verifyJwt },
    createRentalTransactionController
  );
}
