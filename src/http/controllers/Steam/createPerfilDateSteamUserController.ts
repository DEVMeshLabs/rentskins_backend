import { makeCreatePerfil } from "@/useCases/@factories/Perfil/makeCreatePerfil";
import axios from "axios";
import { FastifyRequest, FastifyReply } from "fastify";
import { env } from "process";
import { createPerfilInfoSchema } from "../Perfil/Schemas/createPerfilInfoSchema";

export async function createPerfilDateController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const {
      owner_id,
      status_member,
      delivery_fee,
      delivery_time,
      total_exchanges,
      steam_level,
    } = createPerfilInfoSchema.parse(req.body);

    const response = await axios.get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${env.STEAM_KEY}&steamids=${owner_id}`
    );

    const playerData = response.data.response.players[0];
    const accountCreationDate = new Date(playerData.timecreated * 1000);
    const makePerfilRepository = makeCreatePerfil();

    const createPerfil = await makePerfilRepository.execute({
      owner_id,
      status_member,
      delivery_fee,
      delivery_time,
      total_exchanges,
      account_date: accountCreationDate,
      steam_level,
    });

    return reply.status(200).send(createPerfil);
  } catch (error) {
    console.error("Erro ao obter a data de criação da conta:", error);
    return reply.status(404).send({ error: error.message });
  }
}
