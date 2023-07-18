import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "@/env";

export async function verifyJwt(req: FastifyRequest, reply: FastifyReply) {
  const bearToken = req.headers.authorization;

  if (!bearToken) {
    return reply.status(400).send({ error: "Precisa passar o token" });
  }
  const token = bearToken.split("Bearer ")[1];

  try {
    const decode = jwt.verify(token, env.JWT_SECRET);
    return decode;
  } catch (error) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
