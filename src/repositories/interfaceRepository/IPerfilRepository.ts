import { PerfilInfo, Prisma } from "@prisma/client";

export interface IPerfilInfoRepository {
  create(data: Prisma.PerfilInfoCreateInput): Promise<PerfilInfo>;
  findByUser(owner_id: string): Promise<PerfilInfo | null>;
}
