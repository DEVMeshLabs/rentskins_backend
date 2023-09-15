import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";

import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { SameUsersError } from "../@errors/Skin/SameUsersError";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";

interface ITransactionRequest {
  seller_id: string;
  buyer_id: string;
  skin_id: string;
}

export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private perfilRepository: IPerfilRepository,
    private skinRepository: ISkinsRepository
  ) {}

  async execute({ seller_id, buyer_id, skin_id }: ITransactionRequest) {
    const [perfilBuyer, perfilSeller, findSkin] = await Promise.all([
      this.perfilRepository.findByUser(buyer_id),
      this.perfilRepository.findByUser(seller_id),
      this.skinRepository.findById(skin_id),
    ]);

    if (!perfilBuyer || !perfilSeller) {
      throw new PerfilNotExistError();
    } else if (perfilBuyer === perfilSeller) {
      throw new SameUsersError();
    } else if (!findSkin) {
      throw new SkinNotExistError();
    }

    const createTransaction = await this.transactionRepository.create({
      skin_id,
      seller_id,
      buyer_id,
      balance: findSkin.skin_price,
    });
    return createTransaction;
  }
}
