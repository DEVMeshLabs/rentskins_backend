import { Prisma, Wallet } from "@prisma/client";

export interface IWalletRepository {
  findByMany(): Promise<Wallet[]>;
  findById(id: string): Promise<Wallet | null>;
  findByUser(owner_id: string): Promise<Wallet | null>;
  updateByIdValor(id: string, valor: string): Promise<Wallet>;
  create(data: Prisma.WalletCreateInput): Promise<Wallet>;
  deleteWallet(id: string): Promise<Wallet>;
}
