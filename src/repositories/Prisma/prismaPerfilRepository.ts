import { prisma } from "@/lib/prisma";
import { IPerfilRepository } from "../interfaceRepository/IPerfilRepository";
import { Prisma } from "@prisma/client";

export class PrismaPerfilRepository implements IPerfilRepository {
  async create(data: Prisma.PerfilCreateInput) {
    const createPerfil = prisma.perfil.create({
      data,
    });
    return createPerfil;
  }

  async findByUser(owner_id: string) {
    const perfilUser = await prisma.perfil.findFirst({
      where: { owner_id, deletedAt: null },
    });
    return perfilUser;
  }

  async findById(id: string) {
    const perfilId = await prisma.perfil.findFirst({
      where: { id, deletedAt: null },
    });
    return perfilId;
  }

  async updateById(id: string, date: Prisma.PerfilUpdateInput) {
    const updateId = await prisma.perfil.update({
      where: { id },
      data: { ...date, updatedAt: new Date() },
    });
    return updateId;
  }

  async updateLevel(id: string, steam_level: number) {
    const updateId = await prisma.perfil.update({
      where: { id },
      data: { steam_level, updatedAt: new Date() },
    });
    return updateId;
  }

  async deletePerfil(id: string) {
    const deletePerfil = await prisma.perfil.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return deletePerfil;
  }
}
