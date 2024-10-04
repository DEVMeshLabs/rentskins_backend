import { TransactionHistory, type GuaranteeSkin } from "@prisma/client";
import type { ISkinGuaranteeRepository } from "../interfaceRepository/ISkinGuarantee";

export class InMemorySkinGuaranteeRepository
  implements ISkinGuaranteeRepository
{
  public skinGuarantee: GuaranteeSkin[] = [];

  private notImplemented(): Promise<any> {
    return this.notImplemented();
  }

  async findByAssets(assetIds: string[]): Promise<GuaranteeSkin[]> {
    const skins = this.skinGuarantee.filter((skin) => {
      return assetIds.includes(skin.asset_id);
    });

    return skins;
  }

  findManySend(): Promise<GuaranteeSkin[]> {
    return this.notImplemented();
  }

  findByTrasactionId(
    transactionId: string
  ): Promise<TransactionHistory | null> {
    return this.notImplemented();
  }

  findById(id: string): Promise<GuaranteeSkin | null> {
    return this.notImplemented();
  }

  async updateById(id: string, data: any) {
    const index = this.skinGuarantee.findIndex(
      (transaction) => transaction.id === id
    );

    if (index !== -1) {
      this.skinGuarantee[index] = {
        ...this.skinGuarantee[index],
        ...data,
      };
      return this.skinGuarantee[index];
    }

    return this.skinGuarantee[index];
  }
}
