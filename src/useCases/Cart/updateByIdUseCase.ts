import { ICartRepository } from "@/repositories/interface/ICartRepository";
import { Cart } from "@prisma/client";
import { CartNotExistError } from "../errors/Cart/CartNotExistError";

interface IUpdateRequest {
  buyer_name: string;
  price: string;
}

export class UpdateByIdCartUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(
    id: string,
    { buyer_name, price }: IUpdateRequest
  ): Promise<Cart> {
    const getCart = await this.cartRepository.findById(id);

    if (!getCart) {
      throw new CartNotExistError();
    }

    const updateId = await this.cartRepository.updateById(id, {
      buyer_name,
      price,
    });
    return updateId;
  }
}
