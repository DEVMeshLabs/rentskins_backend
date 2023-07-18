import { ICartRepository } from "@/repositories/interface/ICartRepository";
import { Cart } from "@prisma/client";

export class GetCartBuyerUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(buyer_id: string): Promise<Cart> {
    const getCartBuyer = await this.cartRepository.findById(buyer_id);
    return getCartBuyer;
  }
}
