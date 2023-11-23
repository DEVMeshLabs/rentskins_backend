import { makeCreatePerfil } from "@/useCases/@factories/Perfil/makeCreatePerfil";
import { FastifyRequest, FastifyReply } from "fastify";
import { env } from "process";
import { getAllData } from "@/utils/getAllResponse";
import { createPerfilInfoSchema } from "./Schemas/createPerfilInfoSchema";
import { PerfilAlreadyExistError } from "@/useCases/@errors/Perfil/PerfilInfoAlreadyExistError";
import { VerifyAccountVacBanError } from "@/useCases/@errors/Perfil/VerifyAccountVacBanError";

export async function createPerfilDateController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { owner_id, owner_name, picture, owner_country, steam_url } =
      createPerfilInfoSchema.parse(req.body);

    const steamURLs = [
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${env.STEAM_KEY}&steamids=${owner_id}`,
    ];

    const [playerData] = await getAllData(steamURLs).then((resp) => resp);

    if (!playerData.success) {
      return reply.status(400).send({ error: "Failed request, check steamId" });
    }

    const accountCreationDate = new Date(
      playerData.data.response.players[0].timecreated * 1000
    );

    const makePerfilRepository = makeCreatePerfil();

    await makePerfilRepository.execute({
      owner_id,
      owner_name,
      owner_country,
      steam_created_date: accountCreationDate,
      picture,
      steam_url,
    });
  } catch (error) {
    if (error instanceof PerfilAlreadyExistError) {
      return reply.status(409).send({ error: error.message });
    } else if (error instanceof VerifyAccountVacBanError) {
      return reply.status(401).send({ error: error.message });
    }
    if (error instanceof Error) {
      return reply.status(500).send({ error: error.message });
    }
  }

  return reply.status(201).send();
}
