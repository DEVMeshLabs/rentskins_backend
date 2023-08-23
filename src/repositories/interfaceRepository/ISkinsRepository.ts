import { Prisma, Skin } from "@prisma/client";

export interface ISkinsRepository {
  findBySearch(search: string, page: number, pageSize: number): Promise<Skin[]>;
  findById(id: string): Promise<Skin | null>;
  findBySeller(seller_id: string): Promise<Skin | null>;
  findByMany(page: number, pageSize: number): Promise<Skin[]>;
  findByManyWeapon(skin_weapon: string): Promise<Skin[] | null>;
  findByManyCategory(skin_category: string): Promise<Skin[] | null>;
  findByManySeller(seller_id: string): Promise<Skin[]>;
  findHistoricId(seller_id: string): Promise<any>;
  findByCount(): Promise<number>;
  updateById(id: string, data: Prisma.SkinUpdateInput): Promise<Skin>;
  create(data: Prisma.SkinCreateManyInput): Promise<Prisma.BatchPayload>;
  deleteSkin(id: string): Promise<Skin>;
}
