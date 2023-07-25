import { ICartRepository } from "@/repositories/interface/ICartRepository";
import { Cart } from "@prisma/client";
import { CartAlreadyExistError } from "../errors/Cart/CartAlreadyExistError";

interface createCartRequest {
  buyer_name: string;
  buyer_id: string;
  price: string;
}

export class CreateCartUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute({
    buyer_id,
    buyer_name,
    price,
  }: createCartRequest): Promise<Cart> {
    const getBuyer = await this.cartRepository.findByBuyer(buyer_id);

    if (getBuyer) {
      throw new CartAlreadyExistError();
    }

    const createCart = await this.cartRepository.create({
      buyer_id,
      buyer_name,
      price,
    });
    return createCart;
  }
}
