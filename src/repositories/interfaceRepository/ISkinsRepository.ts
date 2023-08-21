import { Prisma, Skin } from "@prisma/client";

export interface ISkinsRepository {
  findByName(name: string): Promise<Skin[]>;
  findById(id: string): Promise<Skin | null>;
  findBySeller(seller_id: string): Promise<Skin | null>;
  findByMany(): Promise<Skin[]>;
  findByManyWeapon(skin_weapon: string): Promise<Skin[] | null>;
  findByManyCategory(skin_category: string): Promise<Skin[] | null>;
  findByManySeller(seller_id: string): Promise<Skin[]>;
  findHistoricId(seller_id: string): Promise<any>;
  updateById(id: string, data: Prisma.SkinUpdateInput): Promise<Skin>;
  create(data: Prisma.SkinCreateManyInput): Promise<Prisma.BatchPayload>;
  deleteSkin(id: string): Promise<Skin>;
}
