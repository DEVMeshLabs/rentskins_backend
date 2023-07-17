import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "@/env";

export async function verifyJwt(req: FastifyRequest, reply: FastifyReply) {
  const { token } = req.headers;
  try {
    const decode = await jwt.verifyJwt(token, env.JWT_SECRET);
    return decode;
  } catch (error) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
