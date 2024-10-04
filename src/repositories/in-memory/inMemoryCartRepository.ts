import { Cart, Prisma } from "@prisma/client";
import { ICartRepository } from "../interfaceRepository/ICartRepository";
import { randomUUID } from "crypto";

export class InMemoryCartRepository implements ICartRepository {
  public cart = [];
  private notImplemented(): Promise<any> {
    return Promise.resolve(null);
  }

  async create(data: Prisma.CartCreateInput): Promise<Cart> {
    const cart = {
      id: data.id ?? randomUUID(),
      buyer_id: data.buyer_id,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    this.cart.push(cart);

    const cartFilter = this.cart.find(
      (cart) => cart.buyer_id === data.buyer_id
    );

    return cartFilter;
  }

  findByMany() {
    return this.notImplemented();
  }

  updateByUser(owner_id: string, data: any) {
    return this.notImplemented();
  }

  findById(id: string) {
    return this.notImplemented();
  }

  findByBuyer(buyer_id: string) {
    return this.notImplemented();
  }

  updateById(id: string, data: Prisma.CartUpdateInput) {
    return this.notImplemented();
  }

  deleteId(id: string) {
    return this.notImplemented();
  }
}
