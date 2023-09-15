import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { CreateCheckoutSessionStripeUseCase } from "@/useCases/Transaction/createCheckoutSessionStripeUseCase";

export function makeCreateCheckoutSessionStripe() {
  const perfilRepository = new PrismaPerfilRepository();
  const createCheckout = new CreateCheckoutSessionStripeUseCase(
    perfilRepository
  );
  return createCheckout;
}
