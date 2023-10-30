import { Prisma } from "@prisma/client";
import { IConfigurationRepository } from "../interfaceRepository/IConfigurationRepository";
import { prisma } from "@/lib/prisma";

export class PrismaConfigurationRepository implements IConfigurationRepository {
  async delete(id: string) {
    const deleteId = await prisma.configuration.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return deleteId;
  }

  async updateById(
    owner_id: string,
    data: Prisma.ConfigurationUncheckedUpdateManyInput
  ) {
    const updateUser = await prisma.configuration.updateMany({
      where: { owner_id },
      data: { ...data, updatedAt: new Date() },
    });
    return updateUser;
  }

  async create(data: Prisma.ConfigurationCreateInput) {
    try {
      const createConfiguration = await prisma.configuration.create({
        data,
      });
      return createConfiguration;
    } catch (error) {
      console.error("Erro ao criar a configuração:", error);
      throw new Error(error);
    }
  }

  async findByMany() {
    const findManyConfig = await prisma.configuration.findMany({
      where: { deletedAt: null },
    });

    return findManyConfig;
  }

  async findById(id: string) {
    const findId = await prisma.configuration.findFirst({
      where: { id, deletedAt: null },
    });
    return findId;
  }

  async findByUser(owner_id: string) {
    const findIdUser = await prisma.configuration.findFirst({
      where: { owner_id, deletedAt: null },
    });
    return findIdUser;
  }
}
