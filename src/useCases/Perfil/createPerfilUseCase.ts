import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { Prisma, Perfil } from "@prisma/client";
import fetch from "node-fetch";
import { PerfilAlreadyExistError } from "../@errors/Perfil/PerfilInfoAlreadyExistError";
import { VerifyAccountVacBanError } from "../@errors/Perfil/VerifyAccountVacBanError";

export class CreatePerfilUseCase {
  constructor(
    private perfilRepository: IPerfilRepository,
    private configurationRepository: IConfigurationRepository
  ) {}

  async execute(
    configurationData: Prisma.ConfigurationCreateInput,
    perfilData: Prisma.PerfilUncheckedCreateInput
  ): Promise<Perfil> {
    const [existingProfile, existingProfileNotDeleted] = await Promise.all([
      this.perfilRepository.findByUser(perfilData.owner_id),
      this.perfilRepository.findByUserNotDeleteAt(perfilData.owner_id),
    ]);

    const steamApiUrl = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1?key=0B98876BF7EBF6720920F4F00CD20FA3&steamids=${perfilData.owner_id}`;
    const isVacBan = await fetch(steamApiUrl).then((response) =>
      response.json()
    );

    if (isVacBan.players[0].VACBanned) {
      throw new VerifyAccountVacBanError();
    } else if (existingProfile) {
      throw new PerfilAlreadyExistError();
    }

    if (
      existingProfileNotDeleted &&
      existingProfileNotDeleted.deletedAt !== null
    ) {
      return this.perfilRepository.updateByIdUser(perfilData.owner_id, {
        deletedAt: null,
      });
    }

    const createdConfiguration = await this.configurationRepository.create({
      ...configurationData,
    });

    const createdPerfil = await this.perfilRepository.create({
      ...perfilData,
      configurationId: createdConfiguration.id,
    });

    return createdPerfil;
  }
}
