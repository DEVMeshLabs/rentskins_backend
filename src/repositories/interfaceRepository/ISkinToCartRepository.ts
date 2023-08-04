import { Prisma, SkinToCart } from "@prisma/client";

export interface ISkinToCartRepository {
  create(data: Prisma.SkinToCartCreateManyInput): Promise<SkinToCart>;
}
