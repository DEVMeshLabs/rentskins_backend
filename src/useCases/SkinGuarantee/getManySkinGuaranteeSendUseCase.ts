import type { ISkinGuaranteeRepository } from "@/repositories/interfaceRepository/ISkinGuarantee";
import { GuaranteeSkin } from "@prisma/client";

export class GetManySkinGuaranteeSendUseCase {
  constructor(private skinGuaranteeRepository: ISkinGuaranteeRepository) {}

  async execute(): Promise<GuaranteeSkin[]> {
    const findSkinsGuarantee =
      await this.skinGuaranteeRepository.findManySend();
    return findSkinsGuarantee;
  }
}
