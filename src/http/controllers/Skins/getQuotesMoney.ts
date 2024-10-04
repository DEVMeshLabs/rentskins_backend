import { FastifyRequest, FastifyReply } from "fastify";

export async function getQuotesMoney(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const url = "https://economia.awesomeapi.com.br/last/USD-BRL";
    const response = await fetch(url).then((res) => res.json());

    return reply.status(200).send(response);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
