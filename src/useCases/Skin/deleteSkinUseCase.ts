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

    const deleteSkin = await this.skinRepository.deleteSkin(id);

    if (deleteSkin.deletedAt !== null) {
      await this.notificationRepository.create({
        owner_id: deleteSkin.seller_id,
        owner_name: deleteSkin.seller_name,
        description: "Skin deleted successfully",
        skin_id: deleteSkin.id,
      });
    }

    return deleteSkin;
  }
}
