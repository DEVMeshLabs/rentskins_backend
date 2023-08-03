// import axios from "axios";
import { FastifyRequest, FastifyReply } from "fastify";
import axios from "axios";
import { env } from "process";

export async function dateController(req: FastifyRequest, reply: FastifyReply) {
  const { owner_id } = req.params as { owner_id: string };

  try {
    const response = await axios.get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${env.STEAM_KEY}&steamids=${owner_id}`
    );

    const playerData = response.data.response.players[0];
    const accountCreationDate = new Date(playerData.timecreated * 1000);
    return reply.status(200).send(accountCreationDate);
  } catch (error) {
    console.error("Erro ao obter a data de criação da conta:", error);
    return reply.status(404).send({ error: error.message });
  }
}
