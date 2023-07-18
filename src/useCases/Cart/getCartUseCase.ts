import { ICartRepository } from "@/repositories/interface/ICartRepository";
import { Cart } from "@prisma/client";

export class GetCartUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(id: string): Promise<Cart> {
    const getCart = await this.cartRepository.findById(id);
    return getCart;
  }
}
