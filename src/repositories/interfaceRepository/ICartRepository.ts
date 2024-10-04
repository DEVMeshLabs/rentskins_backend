import { Cart, Prisma } from "@prisma/client";

export interface ICartRepository {
  create(data: Prisma.CartCreateInput): Promise<Cart>;
  findByMany(): Promise<Cart[]>;
  findById(id: string): Promise<Cart>;
  findByBuyer(buyer_id: string): Promise<Cart>;
  updateById(id: string, data: Prisma.CartUpdateInput): Promise<Cart>;
  updateByUser(owner_id: string, data: any): Promise<Cart>;
  deleteId(id: string): Promise<Cart>;
}
