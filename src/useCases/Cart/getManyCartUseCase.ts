import { ICart } from "@/@types/ICart";
import { ICartRepository } from "@/repositories/interfaceRepository/ICartRepository";

export class GetManyCartUseCase {
  constructor(private cartRepository: ICartRepository) {}
  async execute(): Promise<ICart[]> {
    const getMany = await this.cartRepository.findByMany();

    const response = getMany.map((item) => {
      const { skinId, ...result } = item;
      return result;
    });

    return response;
  }
}
