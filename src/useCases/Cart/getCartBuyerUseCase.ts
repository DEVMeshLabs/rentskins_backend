import { ICartRepository } from "@/repositories/interfaceRepository/ICartRepository";
import { CartNotExistError } from "../@errors/Cart/CartNotExistError";

interface ICartResponse {
  id: string;
  buyer_id: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class GetCartBuyerUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(buyer_id: string): Promise<ICartResponse> {
    const getCartBuyer = await this.cartRepository.findByBuyer(buyer_id);

    if (!getCartBuyer) {
      throw new CartNotExistError();
    }

    const { skinId, ...cart } = getCartBuyer;

    return cart;
  }
}
