import { FastifyInstance } from "fastify";
import { sendMailController } from "./sendMail";

export async function mailRoter(app: FastifyInstance) {
  app.post("/v1/sendmail", sendMailController);
}
