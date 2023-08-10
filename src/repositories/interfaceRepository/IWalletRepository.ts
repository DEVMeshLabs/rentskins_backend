import { Prisma, Wallet } from "@prisma/client";

export interface IWalletRepository {
  findByMany(): Promise<Wallet[]>;
  findById(id: string): Promise<Wallet | null>;
  findByUser(owner_id: string): Promise<Wallet | null>;
  findByWalletsId(id: string, other_id: string): Promise<any>;
  updateByUserValue(
    owner_id: string,
    type: string,
    valor: number
  ): Promise<any>;
  updateWalletsUsers(id: string, other: string, valor: number): Promise<any>;
  create(data: Prisma.WalletCreateInput): Promise<Wallet>;
  deleteWallet(id: string): Promise<Wallet>;
}
