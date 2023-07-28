import { ICartRepository } from "@/repositories/interface/ICartRepository";
import { Cart } from "@prisma/client";
import { CartNotExistError } from "../@errors/Cart/CartNotExistError";

export class DeleteCartUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(id: string): Promise<Cart> {
    const findById = await this.cartRepository.findById(id);

    if (!findById) {
      throw new CartNotExistError();
    }
    const deleteId = await this.cartRepository.deleteId(id);

    return deleteId;
  }
}
