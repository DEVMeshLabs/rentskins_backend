import { Perfil } from "@prisma/client";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class GetUserPerfilUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(owner_id: string): Promise<Perfil> {
    const walletUser = await this.perfilRepository.findByUser(owner_id);
    if (!walletUser) {
      throw new PerfilNotExistError();
    }

    return walletUser;
  }
}
