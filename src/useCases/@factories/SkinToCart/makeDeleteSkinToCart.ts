import { PrismaSkinToCartRepository } from "@/repositories/Prisma/prismaSkinToCartRepository";
import { DeleteSkinToCartUseCase } from "@/useCases/SkinToCart/deleteSkinToCartUseCase";

export function makeDeleteSkinToCase() {
  const prismaSkinRepository = new PrismaSkinToCartRepository();
  const deleteSkinToCart = new DeleteSkinToCartUseCase(prismaSkinRepository);

  return deleteSkinToCart;
}
