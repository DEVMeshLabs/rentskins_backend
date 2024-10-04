import { ICartRepository } from "@/repositories/interfaceRepository/ICartRepository";
import { Cart } from "@prisma/client";
import { CartAlreadyExistError } from "../@errors/Cart/CartAlreadyExistError";

interface createCartRequest {
  buyer_name: string;
  buyer_id: string;
  price: number;
  seller_id: string;
  seller_name: string;
}

export class CreateCartUseCase {
  constructor(private cartRepository: ICartRepository) {}

  async execute({ buyer_id }: createCartRequest): Promise<Cart> {
    const getBuyer = await this.cartRepository.findByBuyer(buyer_id);

    if (getBuyer) {
      throw new CartAlreadyExistError();
    }

    const createCart = await this.cartRepository.create({
      buyer_id,
    });

    return createCart;
  }
}
