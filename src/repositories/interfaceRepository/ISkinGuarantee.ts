import type { GuaranteeSkin, Prisma } from "@prisma/client";

export interface ISkinGuaranteeRepository {
  updateById(
    id: string,
    data: Prisma.GuaranteeSkinUncheckedUpdateManyInput
  ): Promise<GuaranteeSkin>;
  findById(id: string): Promise<GuaranteeSkin | null>;
  findByAssets(assetIds: string[]): Promise<GuaranteeSkin[]>;
  findManySend(): Promise<GuaranteeSkin[]>;
}
