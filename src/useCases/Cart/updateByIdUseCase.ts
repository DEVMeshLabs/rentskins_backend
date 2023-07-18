import { ICartRepository } from "@/repositories/interface/ICartRepository";
import { Cart } from "@prisma/client";
import { CartNotExistError } from "../errors/Cart/CartNotExistError";

interface IUpdateRequest {
  buyer_id: string;
  buyer_name: string;
}

export class updateByIdUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(
    id: string,
    { buyer_id, buyer_name }: IUpdateRequest
  ): Promise<Cart> {
    const getCart = await this.cartRepository.findById(id);

    if (!getCart) {
      throw new CartNotExistError();
    }

    const updateId = await this.cartRepository.updateById(id, {
      buyer_id,
      buyer_name,
    });
    return updateId;
  }
}
