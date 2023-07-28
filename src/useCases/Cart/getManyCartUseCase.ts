import { ICartRepository } from "@/repositories/interfaceRepository/ICartRepository";
import { Cart } from "@prisma/client";

export class GetManyCartUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(): Promise<Cart[]> {
    const getMany = await this.cartRepository.findByMany();
    return getMany;
  }
}
