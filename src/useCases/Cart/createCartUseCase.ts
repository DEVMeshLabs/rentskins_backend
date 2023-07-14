import { ICartRepository } from "@/repositories/interface/ICartRepository";
import { Cart } from "@prisma/client";

interface createCartRequest {
  buyer_name: string;
  buyer_id: string;
}

export class CreateCartUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute({ buyer_id, buyer_name }: createCartRequest): Promise<Cart> {
    const createCart = await this.cartRepository.create({
      buyer_id,
      buyer_name,
    });
    return createCart;
  }
}
