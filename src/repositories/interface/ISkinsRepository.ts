import { Prisma, Skin } from "@prisma/client";

export interface ISkinsRepository {
  findById(id: string): Promise<Skin | null>;
  create(data: Prisma.SkinUncheckedCreateInput): Promise<Skin>;
}
