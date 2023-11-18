import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { Prisma, Perfil } from "@prisma/client";
import fetch from "node-fetch";
import { PerfilAlreadyExistError } from "../@errors/Perfil/PerfilInfoAlreadyExistError";
import { VerifyAccountVacBanError } from "../@errors/Perfil/VerifyAccountVacBanError";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { ICartRepository } from "@/repositories/interfaceRepository/ICartRepository";

export class CreatePerfilUseCase {
  constructor(
    private perfilRepository: IPerfilRepository,
    private configurationRepository: IConfigurationRepository,
    private walletRepository: IWalletRepository,
    private cartRepository: ICartRepository
  ) {}

  async execute(
    perfilData: Prisma.PerfilUncheckedCreateInput
  ): Promise<Perfil> {
    const [existingProfile, existingProfileNotDeleted] = await Promise.all([
      this.perfilRepository.findByUser(perfilData.owner_id),
      this.perfilRepository.findByUserNotDeleteAt(perfilData.owner_id),
    ]);

    const isVacBan = await this.verifyAccountVacBan(perfilData.owner_id);

    if (isVacBan) {
      throw new VerifyAccountVacBanError();
    } else if (existingProfile) {
      throw new PerfilAlreadyExistError();
    }

    if (
      existingProfileNotDeleted &&
      existingProfileNotDeleted.deletedAt !== null
    ) {
      await this.perfilRepository.updateByIdUser(perfilData.owner_id, {
        deletedAt: null,
      });
      await this.configurationRepository.updateByUser(perfilData.owner_id, {
        deletedAt: null,
      });

      await this.walletRepository.updateByUser(perfilData.owner_id, {
        deletedAt: null,
      });
    }

    const createdConfiguration = await this.configurationRepository.create({
      owner_name: perfilData.owner_name,
      owner_id: perfilData.owner_id,
    });

    await this.walletRepository.create({
      owner_id: perfilData.owner_id,
      owner_name: perfilData.owner_name,
    });

    await this.cartRepository.create({
      buyer_id: perfilData.owner_id,
    });

    const createdPerfil = await this.perfilRepository.create({
      ...perfilData,
      configurationId: createdConfiguration.id,
    });

    return createdPerfil;
  }

  private async verifyAccountVacBan(owner_id: string): Promise<boolean> {
    const steamApiUrl = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1?key=0B98876BF7EBF6720920F4F00CD20FA3&steamids=${owner_id}`;
    const response = await fetch(steamApiUrl);
    const isVacBan = await response.json();

    return isVacBan.players[0].VACBanned;
  }
}
