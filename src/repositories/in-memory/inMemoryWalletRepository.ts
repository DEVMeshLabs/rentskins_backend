import { Prisma, Wallet } from "@prisma/client";
import { IWalletRepository } from "../interfaceRepository/IWalletRepository";
import { randomUUID } from "crypto";

export class InMemoryWalletRepository implements IWalletRepository {
  public wallet: Wallet[] = [];
  private notImplemented(): Promise<any> {
    return Promise.resolve(null);
  }

  findByMany() {
    return this.notImplemented();
  }

  findById(id: string) {
    return this.notImplemented();
  }

  async findByUser(owner_id: string) {
    const getWallet = this.wallet.find((item) => item.owner_id === owner_id);
    return getWallet;
  }

  findByWalletsId(id: string, other_id: string): Promise<any> {
    return this.notImplemented();
  }

  // updateByUserValue
  async updateByUserValue(owner_id: string, type: string, valor: number) {
    const userWalletIndex = this.wallet.findIndex(
      (item) => item.owner_id === owner_id
    );
    if (userWalletIndex !== -1) {
      if (type === "decrement") {
        this.wallet[userWalletIndex] = {
          ...this.wallet[userWalletIndex],
          value: this.wallet[userWalletIndex].value - valor,
        };
      } else if (type === "increment") {
        this.wallet[userWalletIndex] = {
          ...this.wallet[userWalletIndex],
          value: this.wallet[userWalletIndex].value + valor,
        };
      }
    }
    console.log(this.wallet[userWalletIndex]);
    return this.wallet[userWalletIndex];
  }

  updateWalletsUsers(id: string, other: string, valor: number): Promise<any> {
    return this.notImplemented();
  }

  async create(data: Prisma.WalletCreateInput) {
    const createWallet = {
      id: data.id ?? randomUUID(),
      owner_name: data.owner_name,
      owner_id: data.owner_id,
      value: 5000,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    this.wallet.push(createWallet);
    return createWallet;
  }

  deleteWallet(id: string) {
    return this.notImplemented();
  }
}
