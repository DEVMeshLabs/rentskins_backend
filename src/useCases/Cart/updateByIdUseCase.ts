import { ICartRepository } from "@/repositories/interfaceRepository/ICartRepository";
import { Cart, Prisma } from "@prisma/client";
import { CartNotExistError } from "../@errors/Cart/CartNotExistError";

export class UpdateByIdCartUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(id: string, { price }: Prisma.CartUpdateInput): Promise<Cart> {
    const getCart = await this.cartRepository.findById(id);

    if (!getCart) {
      throw new CartNotExistError();
    }

    const updateId = await this.cartRepository.updateById(id, {
      price,
    });
    return updateId;
  }
}
