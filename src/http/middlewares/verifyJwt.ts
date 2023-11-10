import { FastifyRequest, FastifyReply } from "fastify";

export async function verifyJwt(req: FastifyRequest, reply: FastifyReply) {
  const bearToken = req.headers.authorization;

  if (!bearToken) {
    return reply.status(401).send({
      error:
        "Por favor, forneça um token de autorização válido na solicitação.",
    });
  }

  try {
    const decode = await req.jwtVerify();
    return decode;
  } catch (error) {
    return reply.status(403).send({
      error:
        "O token de autorização fornecido é inválido ou expirou. Por favor, verifique suas credenciais e tente novamente.",
    });
  }
}
