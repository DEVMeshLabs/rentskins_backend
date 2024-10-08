import { prisma } from "@/lib/prisma";
import { IPerfilRepository } from "../interfaceRepository/IPerfilRepository";
import { Prisma } from "@prisma/client";

export class PrismaPerfilRepository implements IPerfilRepository {
  async create(data: Prisma.PerfilUncheckedCreateInput) {
    const createPerfil = prisma.perfil.create({
      data,
    });
    return createPerfil;
  }

  async findByUser(owner_id: string) {
    const perfilUser = await prisma.perfil.findFirst({
      where: { owner_id, deletedAt: null },
      include: { configuration: true, cart: true },
    });
    return perfilUser;
  }

  async findByUsers(owner_ids: string[]) {
    const perfilUser = await prisma.perfil.findFirst({
      where: { owner_id: { in: owner_ids }, deletedAt: null },
      include: { configuration: true, cart: true },
    });
    return perfilUser;
  }

  async findByUserNotDeleteAt(owner_id: string) {
    const perfilUser = await prisma.perfil.findFirst({
      where: { owner_id },
    });
    return perfilUser;
  }

  async findByStatus(owner_id: string) {
    const perfilId = await prisma.perfil.findFirst({
      where: { owner_id, deletedAt: null },
      select: { account_status: true },
    });
    return perfilId;
  }

  async findById(id: string) {
    const perfilId = await prisma.perfil.findFirst({
      where: { id, deletedAt: null },
      include: { configuration: true, cart: true },
    });
    return perfilId;
  }

  async findByMany() {
    const perfilId = await prisma.perfil.findMany({
      where: { deletedAt: null },
      include: { configuration: true, cart: true },
    });
    return perfilId;
  }

  async findManyTypeUser(owner_type: string) {
    const perfilTypeUser = await prisma.perfil.findMany({
      where: {
        owner_type,
        deletedAt: null,
      },
      include: { configuration: true, cart: true },
    });
    return perfilTypeUser;
  }

  async updateById(id: string, date: Prisma.PerfilUncheckedCreateInput) {
    const updateId = await prisma.perfil.update({
      where: { id },
      data: { ...date, updatedAt: new Date() },
    });
    return updateId;
  }

  async updateByUser(
    owner_id: string,
    date: Prisma.PerfilUncheckedCreateInput
  ) {
    const updateId = await prisma.perfil.update({
      where: { owner_id },
      data: { ...date, updatedAt: new Date() },
    });
    return updateId;
  }

  async updateByIdUser(owner_id: string, date: any) {
    const updateUser = await prisma.perfil.updateMany({
      where: { owner_id },
      data: { ...date, updatedAt: new Date() },
    });
    return updateUser;
  }

  async updateTotalExchanges(buyerIds: string[]) {
    const updateTotalExchanges = await prisma.perfil.updateMany({
      where: { owner_id: { in: buyerIds } },
      data: { total_exchanges: { increment: 1 }, updatedAt: new Date() },
    });

    return updateTotalExchanges;
  }

  async updateTotalExchangesFailed(steamIds: string) {
    const updateTotalExchanges = await prisma.perfil.update({
      where: { owner_id: steamIds },
      data: { total_exchanges_failed: { increment: 1 }, updatedAt: new Date() },
    });
    console.log(updateTotalExchanges);
    console.log(updateTotalExchanges.total_exchanges_failed);
    return updateTotalExchanges;
  }

  async updateByCart(owner_id: string, cart: string) {
    const updateCart = await prisma.perfil.updateMany({
      where: { owner_id },
      data: { cart_id: cart, updatedAt: new Date() },
    });
    return updateCart;
  }

  async deletePerfil(id: string) {
    const perfil = await prisma.perfil.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await Promise.all([
      prisma.configuration.update({
        where: { id: perfil.configurationId },
        data: { deletedAt: new Date() },
      }),

      prisma.configuration.update({
        where: { id: perfil.configurationId },
        data: { deletedAt: new Date() },
      }),
      prisma.cart.update({
        where: { buyer_id: perfil.owner_id },
        data: { deletedAt: new Date() },
      }),

      prisma.wallet.update({
        where: { owner_id: perfil.owner_id },
        data: { deletedAt: new Date() },
      }),
    ]);

    return perfil;
  }

  async deletePerfilBanco(id: string) {
    const perfil = await prisma.perfil.delete({
      where: { id },
    });

    await Promise.all([
      prisma.configuration.delete({
        where: { id: perfil.configurationId },
      }),

      prisma.configuration.delete({
        where: { id: perfil.configurationId },
      }),
      prisma.cart.delete({
        where: { buyer_id: perfil.owner_id },
      }),

      prisma.wallet.delete({
        where: { owner_id: perfil.owner_id },
      }),
    ]);

    return perfil;
  }
}
