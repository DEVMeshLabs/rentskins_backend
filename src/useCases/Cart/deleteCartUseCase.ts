import { ICartRepository } from "@/repositories/interface/ICartRepository";
import { Cart } from "@prisma/client";
import { CartNotExistError } from "../errors/Cart/CartNotExistError";

export class DeleteCartUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(id: string): Promise<Cart> {
    const deleteId = await this.cartRepository.deleteId(id);

    if (!deleteId) {
      throw new CartNotExistError();
    }

    return deleteId;
  }
}
