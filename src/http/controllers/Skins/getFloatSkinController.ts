import { user, csgo } from "@/server";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getFloatSkinController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };
  const { assetid, inspectLinks } = req.body as {
    inspectLinks: string;
    assetid: string;
  };

  console.log("Começando...");
  user.on("loggedOn", () => {
    user.gamesPlayed(730);
    console.log("Entrou");
    csgo.on("connectedToGC", async () => {
      console.log("Logado!");
      if (csgo.haveGCSession) {
        const filteredID = inspectLinks.split("%D")[1];
        csgo.inspectItem(id, assetid, filteredID, ({ paintwear }) =>
          reply.send(paintwear)
        );
      }
    });
  });
}
