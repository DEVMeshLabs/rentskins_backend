import type { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";
import { RentalTransaction } from "@prisma/client";

export class GetManyUserTransactionRentalUseCase {
  constructor(private rentalTransaction: IRentalTransactionRepository) {}

  async execute(steamId: string): Promise<RentalTransaction[]> {
    const foundProfiles = await this.rentalTransaction.findByManyUser(steamId);
    return foundProfiles;
  }
}
