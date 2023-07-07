import { Prisma, Skin } from "@prisma/client";

export interface ISkinsRepository {
  create(data: Prisma.SkinUncheckedCreateInput): Promise<Skin>;
}
