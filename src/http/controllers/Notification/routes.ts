import { FastifyInstance } from "fastify";
import { createNotificationController } from "./createNotificationController";
import { getManyNotificationController } from "./getManyNotificationController";
import { getUserNotificationController } from "./getUserNotificationController";
import { getNotificationController } from "./getNotificationController";
import { deleteNotificationController } from "./deleteNotificationController";
import { updateManyNotificationController } from "./updateManyNotificationController";
import { getManySkinNotificationController } from "./getManyUserNotificationController";
// import { verifyJwt } from "@/http/middlewares/verifyJwt";

export async function notificationRouter(app: FastifyInstance) {
  // app.addHook("onRequest", verifyJwt);
  app.post("/v1/notification", createNotificationController);
  app.delete("/v1/notification/:id", deleteNotificationController);
  app.put("/v1/notification/:owner_id", updateManyNotificationController);
  app.get("/v1/notification", getManyNotificationController);
  app.get("/v1/notification/:id", getNotificationController);
  app.get("/v1/notification/user/:owner_id", getUserNotificationController);
  app.post(
    "/v1/notification/userAll/:owner_id",
    getManySkinNotificationController
  );
}
