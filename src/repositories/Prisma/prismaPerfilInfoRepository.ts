import { prisma } from "@/lib/prisma";
import { IPerfilInfoRepository } from "../interfaceRepository/IPerfilRepository";
import { Prisma } from "@prisma/client";

export class PrismaPerfilInfoRepository implements IPerfilInfoRepository {
  async create(data: Prisma.PerfilInfoCreateInput) {
    const createPerfil = prisma.perfilInfo.create({
      data,
    });
    return createPerfil;
  }

  async findByUser(owner_id: string) {
    const perfilUser = await prisma.perfilInfo.findFirst({
      where: { owner_id, deletedAt: null },
    });
    return perfilUser;
  }
}
