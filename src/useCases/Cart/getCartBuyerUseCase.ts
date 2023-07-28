import { ICartRepository } from "@/repositories/interface/ICartRepository";
import { Cart } from "@prisma/client";
import { CartNotExistError } from "../@errors/Cart/CartNotExistError";

export class GetCartBuyerUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(buyer_id: string): Promise<Cart> {
    const getCartBuyer = await this.cartRepository.findByBuyer(buyer_id);

    if (!getCartBuyer) {
      throw new CartNotExistError();
    }

    return getCartBuyer;
  }
}
