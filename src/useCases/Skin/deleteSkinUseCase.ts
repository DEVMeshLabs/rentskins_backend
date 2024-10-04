import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";
import { Skin } from "@prisma/client";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";

export class DeleteSkinUseCase {
  constructor(
    private skinRepository: ISkinsRepository,
    private notificationRepository: INotificationRepository
  ) {}

  async execute(id: string): Promise<Skin> {
    const skinId = await this.skinRepository.findById(id);

    if (!skinId) {
      throw new SkinNotExistError();
    }

    const deletedSkin = await this.skinRepository.deleteSkin(id);

    if (deletedSkin.deletedAt !== null) {
      await this.notificationRepository.create({
        owner_id: deletedSkin.seller_id,
        description: "O seu anúncio foi removido com sucesso!",
        skin_id: deletedSkin.id,
      });
    }

    return deletedSkin;
  }
}
