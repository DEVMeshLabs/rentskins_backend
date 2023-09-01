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

export class GetCartUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(id: string): Promise<ICartResponse> {
    const getCart = await this.cartRepository.findById(id);

    if (!getCart) {
      throw new CartNotExistError();
    }

    const { skinId, ...cart } = getCart;

    return cart;
  }
}
