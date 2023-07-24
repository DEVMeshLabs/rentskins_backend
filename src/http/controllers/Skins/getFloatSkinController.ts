import { user, csgo } from "@/server";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getFloatSkinController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };
  const { link, assetid } = req.body as { link: string; assetid: string };

  console.log("Iniciando");
  user.on("loggedOn", () => {
    user.gamesPlayed(730);
    console.log("Com");
    csgo.on("connectedToGC", () => {
      console.log("Logado!");
      const filteredID = link.split("%D")[1];
      csgo.inspectItem(id, assetid, filteredID, ({ paintwear }) => {
        console.log(paintwear);
        return reply.status(200).send(paintwear);
      });
    });
  });
  user.on("error", (error) => console.log(error));
}
