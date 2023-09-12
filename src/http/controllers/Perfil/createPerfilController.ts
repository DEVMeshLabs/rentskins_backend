import { makeCreatePerfil } from "@/useCases/@factories/Perfil/makeCreatePerfil";
import { FastifyRequest, FastifyReply } from "fastify";
import { env } from "process";
import { getAllData } from "@/utils/getAllResponse";
import { createPerfilInfoSchema } from "./Schemas/createPerfilInfoSchema";
import { PerfilAlreadyExistError } from "@/useCases/@errors/Perfil/PerfilInfoAlreadyExistError";

export async function createPerfilDateController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { owner_id, owner_name, picture, owner_country, steam_url } =
      createPerfilInfoSchema.parse(req.body);

    const steamURLs = [
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${env.STEAM_KEY}&steamids=${owner_id}`,
      `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${env.STEAM_KEY}&steamid=${owner_id}`,
    ];

    const resp = await getAllData(steamURLs).then((resp) => resp);

    if (resp[0].sucess === false || resp[1].sucess === false) {
      return reply.status(400).send({ error: "Failed request, check steamId" });
    }

    const playerData = resp[0].data.response.players;
    const accountCreationDate = new Date(playerData[0].timecreated * 1000);
    const makePerfilRepository = makeCreatePerfil();

    await makePerfilRepository.execute(
      {
        owner_id,
        owner_name,
        owner_email: "",
        owner_phone: "",
        owner_cpf: "",
        url_sell: "",
        url_trade: "",
        agreed_with_emails: false,
        agreed_with_terms: false,
      },
      {
        owner_id,
        owner_name,
        owner_country,
        steam_created_date: accountCreationDate,
        steam_level: resp[1].data.response.player_level,
        picture,
        steam_url,
      }
    );
  } catch (error) {
    if (error instanceof PerfilAlreadyExistError) {
      return reply.status(409).send({ error: error.message });
    }
    if (error instanceof Error) {
      return reply.status(500).send({ error: error.message });
    }
  }
  return reply.status(201).send();
}
