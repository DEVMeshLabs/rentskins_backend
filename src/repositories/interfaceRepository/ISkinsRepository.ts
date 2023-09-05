import { Prisma, Skin } from "@prisma/client";

export interface ISkinsRepository {
  findBySearch(search: string, page: number, pageSize: number): Promise<Skin[]>;
  findById(id: string): Promise<Skin | null>;
  findBySeller(seller_id: string): Promise<Skin | null>;
  findByMany(page: number, pageSize: number): Promise<Skin[]>;
  findByManyWeapon(skin_weapon: string): Promise<Skin[] | null>;
  findByManyCategory(skin_category: string): Promise<Skin[] | null>;
  findManyAssent(): Promise<Skin[]>;
  findByManySeller(
    seller_id: string,
    page: number,
    pageSize: number,
    deletedAt: string
  ): Promise<Skin[]>;
  findHistoricId(seller_id: string): Promise<any>;
  findByCountSkins(): Promise<number>;
  findByCountSellers(seller_id: string): Promise<number>;
  findByCountSearch(search: string): Promise<number>;
  updateById(id: string, data: Prisma.SkinUpdateInput): Promise<Skin>;
  create(data: Prisma.SkinCreateManyInput): Promise<Prisma.BatchPayload>;
  deleteSkin(id: string): Promise<Skin>;
}
