import { Prisma, Wallet } from "@prisma/client";

export interface IWalletRepository {
  findByMany(): Promise<Wallet[]>;
  findById(id: string): Promise<Wallet | null>;
  findByUser(owner_id: string): Promise<Wallet | null>;

  updateByUserValue(owner_id: string, valor: string): Promise<any>;
  create(data: Prisma.WalletCreateInput): Promise<Wallet>;
  deleteWallet(id: string): Promise<Wallet>;
}
