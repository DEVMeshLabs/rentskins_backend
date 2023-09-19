import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { Perfil, Prisma } from "@prisma/client";
import { PerfilAlreadyExistError } from "../@errors/Perfil/PerfilInfoAlreadyExistError";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { VerifyAccountVacBanError } from "../@errors/Perfil/VerifyAccountVacBanError";

export class CreatePerfilUseCase {
  constructor(
    private perfilRepository: IPerfilRepository,
    private configurationRespository: IConfigurationRepository
  ) {}

  async execute(
    configurationDate: Prisma.ConfigurationCreateInput,
    perfilDate: Prisma.PerfilUncheckedCreateInput
  ): Promise<Perfil> {
    const foundUserProfile = await this.perfilRepository.findByUser(
      perfilDate.owner_id
    );

    const isVacBan = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1?key=0B98876BF7EBF6720920F4F00CD20FA3&steamids=${perfilDate.owner_id}`
    ).then((response) => response.json());

    if (isVacBan.players[0].VACBanned) {
      throw new VerifyAccountVacBanError();
    } else if (foundUserProfile) {
      throw new PerfilAlreadyExistError();
    }

    const createdConfiguration = await this.configurationRespository.create({
      ...configurationDate,
    });

    const createdPerfil = await this.perfilRepository.create({
      ...perfilDate,
      configurationId: createdConfiguration.id,
    });

    return createdPerfil;
  }
}
