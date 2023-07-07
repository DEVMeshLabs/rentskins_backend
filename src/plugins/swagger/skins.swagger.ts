import { FastifyInstance } from "fastify";

export const skinSwaggerRouter = (
  app: FastifyInstance,
  options: any,
  done: () => void
) => {
  app.get("/me", {
    schema: {
      tags: ["Skins"],
      response: {
        200: {
          type: "object",
          properties: {
            anything: { type: "string" },
          },
        },
      },
    },
    handler: (req, res) => {
      res.send({ anything: "meaningfull" });
    },
  });
  done();
};
