import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export class MakeCreatePerfilRepository {
  constructor(
    private perfilRepository: InMemoryPerfilRepository,
    private configurationRepository: InMemoryConfigurationRepository
  ) {}

  async execute(
    onwer_id: string,
    key?: string,
    override: Partial<Prisma.PerfilCreateInput> = {}
  ) {
    const fakeName = faker.internet.userName();

    const configuration = await this.configurationRepository.create({
      owner_id: onwer_id,
      owner_name: fakeName,
      owner_email: faker.internet.email(),
      owner_phone: faker.phone.number(),
      owner_cpf: "",
      key: key ?? "",
      agreed_with_emails: false,
      agreed_with_terms: false,
      url_trade: "",
      url_sell: "",
    });

    return this.perfilRepository.create({
      owner_id: onwer_id,
      owner_name: fakeName,
      total_exchanges: 0,
      total_exchanges_completed: 0,
      total_exchanges_failed: 0,
      delivery_time: "Sem informações",
      picture: faker.image.avatar(),
      steam_url: "https://steamcommunity.com/profiles/76561198195920183",
      steam_created_date: "your_value_here",
      configurationId: configuration.id,
      ...override,
    });
  }
}
