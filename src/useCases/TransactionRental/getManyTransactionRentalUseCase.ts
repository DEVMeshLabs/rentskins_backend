import type { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";
import { RentalTransaction } from "@prisma/client";

export class GetManyTransactionRentalUseCase {
  constructor(private rentalTransaction: IRentalTransactionRepository) {}

  async execute(): Promise<RentalTransaction[]> {
    const foundProfiles = await this.rentalTransaction.findByMany();
    return foundProfiles;
  }
}
