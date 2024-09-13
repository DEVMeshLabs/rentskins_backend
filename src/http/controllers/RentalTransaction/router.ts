import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { createTransactionRentalController } from "./createTransactionRentalController";
import { getManyTransactionRentalController } from "./getManyTransactionRentalController";
import { getManyUserTransactionRentalController } from "./getManyUserTransactionRentalController";
import { updateStatusTransactionRentalController } from "./updateStatusTransactionRentalController";
import { updateGuaranteeConfirmedController } from "./updateGuaranteeConfirmedController";
import { getTransactionRentUserController } from "./getTransactionRentUserController";
import { updateTransactionRentalBuyController } from "./updateTransactionRentBuyController";
import { updateByIdTransactionRentalController } from "./updateByIdTransactionRentalController";

export async function rentalTransactionRouter(app: FastifyInstance) {
  app.post(
    "/v1/rentalTransaction",
    { onRequest: verifyJwt },
    createTransactionRentalController
  );

  app.patch(
    "/v1/rentalTransaction/:id",
    { onRequest: verifyJwt },
    updateStatusTransactionRentalController
  );

  app.patch(
    "/v1/rentalTransaction/:id/buy",
    { onRequest: verifyJwt },
    updateTransactionRentalBuyController
  );

  app.put("/v1/rentalTransaction/:id", updateGuaranteeConfirmedController);
  app.put(
    "/v1/rentalTransaction/update/:id",
    updateByIdTransactionRentalController
  );

  app.get("/v1/rentalTransaction", getManyTransactionRentalController);
  app.get(
    "/v1/rentalTransaction/:steamId",
    getManyUserTransactionRentalController
  );
  app.get(
    "/v1/rentalTransaction/rent/:steamId",
    getTransactionRentUserController
  );
}
