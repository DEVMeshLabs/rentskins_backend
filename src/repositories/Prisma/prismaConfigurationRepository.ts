import { Prisma } from "@prisma/client";
import { IConfigurationRepository } from "../interface/IConfigurationRepository";
import { prisma } from "@/lib/prisma";

export class PrismaConfigurationRepository implements IConfigurationRepository {
  async create(data: Prisma.ConfigurationCreateInput) {
    const createConfiguration = await prisma.configuration.create({
      data,
    });
    return createConfiguration;
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
