import { Prisma, Skin } from "@prisma/client";

export interface ISkinsRepository {
  findBySearch(
    search: string,
    type: string,
    page: number,
    pageSize: number
  ): any;
  findById(id: string): Promise<Skin | null>;
  findBySlug(slug: string): Promise<Skin | null>;
  findBySeller(seller_id: string): Promise<Skin | null>;
  findByMany(page: number, pageSize: number): Promise<Skin[]>;
  findByManyWeapon(skin_weapon: string): Promise<Skin[] | null>;
  findByManyCategory(skin_category: string): Promise<Skin[] | null>;
  findManyAssent(): Promise<Skin[]>;
  findByManySeller(seller_id: string, deletedAt: string): Promise<Skin[]>;
  findByCountSkins(): Promise<number>;
  findByCountSellers(seller_id: string): Promise<number>;
  findByCountSearch(search: string): Promise<number>;
  findLastSellerSkins(name: string): Promise<Skin[]>;
  updateById(id: string, data: Prisma.SkinUpdateInput): Promise<Skin>;
  create(data: Prisma.SkinCreateManyInput): Promise<any>;
  deleteSkin(id: string): Promise<Skin>;
}
