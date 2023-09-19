import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { Perfil, Prisma } from "@prisma/client";
import { PerfilAlreadyExistError } from "../@errors/Perfil/PerfilInfoAlreadyExistError";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { VerifyAccountVacBanError } from "../@errors/Perfil/VerifyAccountVacBanError";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";

export class CreatePerfilUseCase {
  constructor(
    private perfilRepository: IPerfilRepository,
    private configurationRespository: IConfigurationRepository,
    private transactionRespository: ITransactionRepository
  ) {}

  async execute(
    date: Prisma.ConfigurationCreateInput,
    data1: Prisma.PerfilUncheckedCreateInput
  ): Promise<Perfil> {
    const findIdUser = await this.perfilRepository.findByUser(data1.owner_id);

    // Verificando se o user tem BanVAC na conta
    const vacBan = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1?key=0B98876BF7EBF6720920F4F00CD20FA3&steamids=${data1.owner_id}`
    ).then((response) => response.json());

    if (vacBan.players[0].VACBanned) {
      throw new VerifyAccountVacBanError();
    } else if (findIdUser) {
      throw new PerfilAlreadyExistError();
    }

    const configuration = await this.configurationRespository.create({
      ...date,
    });

    const create = await this.perfilRepository.create({
      ...data1,
      configurationId: configuration.id,
    });

    return create;
  }
}
