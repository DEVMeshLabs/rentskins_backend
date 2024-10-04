import { Prisma, SkinToCart } from "@prisma/client";

export interface ISkinToCartRepository {
  create(data: Prisma.SkinToCartCreateManyInput): Promise<SkinToCart>;
  findById(id: string): Promise<SkinToCart | null>;
  findBySkin(id: string): Promise<SkinToCart | null>;
  deleteSkin(id: string): Promise<SkinToCart>;
}
