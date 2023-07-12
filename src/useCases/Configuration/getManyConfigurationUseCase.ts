import { IConfigurationRepository } from "@/repositories/interface/IConfigurationRepository";
import { Configuration } from "@prisma/client";

export class GetManyConfigurationUseCase {
  constructor(private configuration: IConfigurationRepository) {}

  async execute(): Promise<Configuration[]> {
    const getMany = await this.configuration.findByMany();
    return getMany;
  }
}
