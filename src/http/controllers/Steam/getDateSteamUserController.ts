import axios from "axios";
import { FastifyRequest, FastifyReply } from "fastify";
import { env } from "process";

export async function getDateSteamUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const response = await axios.get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${env.STEAM_KEY}&steamids=${id}`
    );

    const playerData = response.data.response.players[0];
    const accountCreationDate = new Date(playerData.timecreated * 1000);
    return reply.status(200).send(accountCreationDate);
  } catch (error) {
    console.error("Erro ao obter a data de criação da conta:", error);
    return reply.status(404).send({ error: error.message });
  }
}
