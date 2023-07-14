import { Prisma, Skin } from "@prisma/client";

export interface ISkinsRepository {
  findByName(name: string): Promise<Skin[]>;
  findById(id: string): Promise<Skin | null>;
  findBySeller(seller_id: string): Promise<Skin | null>;
  findByMany(): Promise<Skin[]>;
  findByManyWeapon(skin_weapon: string): Promise<Skin[] | null>;
  findByManyCategory(skin_category: string): Promise<Skin[] | null>;
  findByManySeller(seller_id: string): Promise<Skin[]>;
  updateById(id: string, data: Prisma.SkinUpdateInput): Promise<Skin>;
  create(data: Prisma.SkinCreateInput): Promise<Skin>;
  deleteSkin(id: string): Promise<Skin>;
}
