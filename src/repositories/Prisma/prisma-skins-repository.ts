import { Prisma } from ".prisma/client";
import { ISkinsRepository } from "../interface/ISkins-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSkinsRepository implements ISkinsRepository {
  async create(data: Prisma.SkinCreateInput) {
    const skin = await prisma.skin.create({
      data,
    });
    return skin;
  }
}
