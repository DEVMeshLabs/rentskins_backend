import { Perfil } from "@prisma/client";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import axios from "axios";
import { env } from "process";

export class GetUserPerfilUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(owner_id: string): Promise<Perfil> {
    const response = await axios.get(
      `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${env.STEAM_KEY}&steamid=${owner_id}`
    );
    const steamLevel = response.data.response.player_level;
    console.log(response.data.response.player_level);

    const walletUser = await this.perfilRepository.findByUser(owner_id);

    if (!walletUser) {
      throw new PerfilNotExistError();
    }

    if (walletUser.steam_level !== steamLevel) {
      const updateLevel = await this.perfilRepository.updateLevel(
        walletUser.id,
        steamLevel
      );
      return updateLevel;
    }

    return walletUser;
  }
}
