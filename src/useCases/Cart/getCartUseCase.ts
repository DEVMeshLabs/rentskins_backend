import { ICartRepository } from "@/repositories/interfaceRepository/ICartRepository";
import { Cart } from "@prisma/client";
import { CartNotExistError } from "../@errors/Cart/CartNotExistError";

export class GetCartUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(id: string): Promise<Cart> {
    const getCart = await this.cartRepository.findById(id);

    if (!getCart) {
      throw new CartNotExistError();
    }

    return getCart;
  }
}
