import { Cart, Prisma } from "@prisma/client";

export interface ICartRepository {
  create(data: Prisma.CartCreateInput): Promise<Cart>;
  findByMany(): Promise<Cart[]>;
  findById(id: string): Promise<Cart>;
}
