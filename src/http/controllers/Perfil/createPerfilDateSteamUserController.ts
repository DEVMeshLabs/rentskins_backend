import { makeCreatePerfil } from "@/useCases/@factories/Perfil/makeCreatePerfil";
import { FastifyRequest, FastifyReply } from "fastify";
import { env } from "process";
import { getAllData } from "@/utils/getAllResponse";
import { createPerfilInfoSchema } from "./Schemas/createPerfilInfoSchema";

export async function createPerfilDateController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { owner_id, owner_name, picture } = createPerfilInfoSchema.parse(
      req.body
    );

    const steamURLs = [
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${env.STEAM_KEY}&steamids=${owner_id}`,
      `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${env.STEAM_KEY}&steamid=${owner_id}`,
    ];

    const resp = await getAllData(steamURLs)
      .then((resp) => resp)
      .catch((e) => console.log(e));

    const playerData = resp[0].data.response.players;
    const accountCreationDate = new Date(playerData[0].timecreated * 1000);
    const makePerfilRepository = makeCreatePerfil();

    await makePerfilRepository.execute({
      owner_id,
      account_date: accountCreationDate,
      steam_level: resp[1].data.response.player_level,
      owner_name,
      picture,
    });
    return reply.status(200).send();
  } catch (error) {
    console.error("Erro ao obter a data de criação da conta:", error);
    return reply.status(404).send({ error: error.message });
  }
}
