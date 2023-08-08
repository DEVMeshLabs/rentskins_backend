import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { Perfil } from "@prisma/client";

export class GetManyTypeUserPerfilUseCase {
  constructor(private perfilInfoRepository: IPerfilRepository) {}

  async execute(owner_type: string): Promise<Perfil[]> {
    const perfilType = await this.perfilInfoRepository.findManyTypeUser(
      owner_type
    );

    return perfilType;
  }
}
