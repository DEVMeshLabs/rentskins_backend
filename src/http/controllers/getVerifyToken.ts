import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "@/env";

export async function getVerifyToken(req: FastifyRequest, reply: FastifyReply) {
  const bearToken = req.headers.authorization;

  if (!bearToken) {
    return reply.redirect("/");
  }
  const token = bearToken.split("Bearer ")[1];

  try {
    const decode = jwt.verify(token, env.JWT_SECRET);

    return decode;
  } catch (error) {
    return reply.redirect("/");
  }
}
