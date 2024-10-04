import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { Perfil } from "@prisma/client";

export class GetManyPerfilUseCase {
  constructor(private perfilInfoRepository: IPerfilRepository) {}

  async execute(): Promise<Perfil[]> {
    const foundProfiles = await this.perfilInfoRepository.findByMany();
    return foundProfiles;
  }
}
