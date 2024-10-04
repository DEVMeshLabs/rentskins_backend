import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

interface IPerfilResponse {
  id: string;
  owner_id: string;
  owner_name: string;
  owner_type: string;
  owner_country: string | null;
  stripe_id: string | null;
  account_status: string;
  steam_url: string;
  picture: string;
  delivery_time: string;
  total_exchanges: number;
  total_exchanges_completed: number;
  reliability: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  steam_created_date: Date;
  cart_id: string | null;
}

export class GetUserPerfilUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(owner_id: string): Promise<IPerfilResponse> {
    const foundUserProfile = await this.perfilRepository.findByUser(owner_id);

    if (!foundUserProfile) {
      throw new PerfilNotExistError();
    }

    const { configurationId, ...perfilWithoutConfigId } = foundUserProfile;

    return perfilWithoutConfigId;
  }
}
