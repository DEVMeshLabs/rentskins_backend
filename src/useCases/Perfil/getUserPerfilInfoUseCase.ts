import { PerfilInfo } from "@prisma/client";
import { IPerfilInfoRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilInfoNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class GetUserPerfilInfoUseCase {
  constructor(private perfilInfoRepository: IPerfilInfoRepository) {}

  async execute(owner_id: string): Promise<PerfilInfo> {
    const walletUser = await this.perfilInfoRepository.findByUser(owner_id);
    if (!walletUser) {
      throw new PerfilInfoNotExistError();
    }

    return walletUser;
  }
}
