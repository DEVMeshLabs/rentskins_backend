import { Prisma } from ".prisma/client";
import { ISkinsRepository } from "../interface/ISkins-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSkinRepository implements ISkinsRepository {
  async findById(id: string) {
    const skinId = await prisma.skin.findUnique({
      where: {
        id,
      },
    });

    return skinId;
  }

  async create(data: Prisma.SkinCreateInput) {
    const skin = await prisma.skin.create({
      data,
    });
    return skin;
  }
}
