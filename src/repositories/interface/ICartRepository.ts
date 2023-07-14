import { Cart, Prisma } from "@prisma/client";

export interface ICartRepository {
  create(data: Prisma.CartCreateInput): Promise<Cart>;
}
