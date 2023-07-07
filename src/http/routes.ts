import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  app.get("/me", (req, reply) => {
    return reply.status(200).send("Funcionando");
  });
}
