import { Prisma, Skin } from "@prisma/client";

export interface ISkinsRepository {
  findById(id: string): Promise<Skin | null>;
  findBySeller(seller_id: string): Promise<Skin | null>;
  findByMany(): Promise<Skin[]>;
  create(data: Prisma.SkinUncheckedCreateInput): Promise<Skin>;
}
