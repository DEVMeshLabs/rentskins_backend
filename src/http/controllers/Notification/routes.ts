import { FastifyInstance } from "fastify";
import { createNotificationController } from "./createNotificationController";
import { getManyNotificationController } from "./getManyNotificationController";
import { getUserNotificationController } from "./getUserNotificationController";
import { getNotificationController } from "./getNotificationController";
import { deleteNotificationController } from "./deleteNotificationController";
import { updateManyNotificationController } from "./updateManyNotificationController";

export async function notificationRouter(app: FastifyInstance) {
  app.post("/v1/notification", createNotificationController);
  app.delete("/v1/notification/:id", deleteNotificationController);
  app.put("/v1/notification", updateManyNotificationController);
  app.get("/v1/notification", getManyNotificationController);
  app.get("/v1/notification/:id", getNotificationController);
  app.get("/v1/notification/user/:owner_id", getUserNotificationController);
}
