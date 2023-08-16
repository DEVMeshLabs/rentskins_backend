import { Prisma, SkinToCart } from "@prisma/client";

export interface ISkinToCartRepository {
  create(data: Prisma.SkinToCartCreateManyInput): Promise<SkinToCart>;
  findById(id: string): Promise<SkinToCart | null>;
  deleteSkin(ids: string[]): Promise<any>;
}
