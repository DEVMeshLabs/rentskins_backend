import { Prisma, Wallet } from "@prisma/client";

export interface IWalletRepository {
  findByMany(): Promise<Wallet[]>;
  findById(id: string): Promise<Wallet | null>;
  create(data: Prisma.WalletUncheckedCreateInput): Promise<Wallet>;
}
