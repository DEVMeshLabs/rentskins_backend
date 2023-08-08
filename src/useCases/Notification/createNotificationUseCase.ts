import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Notification, Prisma } from "@prisma/client";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";

export class CreateNotificationUseCase {
  constructor(
    private notification: INotificationRepository,
    private skinsRepository: ISkinsRepository
  ) {}

  async execute({
    owner_name,
    owner_id,
    description,
    skin_id,
  }: Prisma.NotificationCreateManyInput): Promise<Notification> {
    const findSkin = await this.skinsRepository.findById(skin_id);

    if (findSkin) {
      throw new SkinNotExistError();
    }

    const createNot = await this.notification.create({
      owner_name,
      owner_id,
      description,
      skin_id,
    });
    return createNot;
  }
}
