import { FastifyInstance } from "fastify";
import { getVerifyToken } from "./getVerifyToken";

export async function tokenRouter(app: FastifyInstance) {
  app.get("/v1/token", getVerifyToken);
}
