import { Prisma, Skin } from "@prisma/client";

export interface ISkinsRepository {
  findById(id: string): Promise<Skin | null>;
  findBySeller(seller_id: string): Promise<Skin | null>;
  findByMany(): Promise<Skin[]>;
  findByManyWeapon(skin_weapon: string): Promise<Skin[] | null>;
  findByManyCategory(skin_category: string): Promise<Skin[] | null>;
  create(data: Prisma.SkinUncheckedCreateInput): Promise<Skin>;
  deleteSkin(id: string): Promise<Skin>;
}
