import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";

interface ICreateSampleProfileRequest {
  owner_id: string;
  owner_name: string;
  total_exchanges?: number;
  total_exchanges_completed?: number;
  total_exchanges_failed?: number;
  delivery_time?: string;
}

export class MockFunctions {
  constructor(
    private skinRepository: InMemorySkinRepository,
    private perfilRepository: InMemoryPerfilRepository,
    private configurationRepository?: InMemoryConfigurationRepository
  ) {}

  async createSampleSkin(seller_id: string) {
    return await this.skinRepository.create({
      asset_id: "10828437704",
      skin_image: "https://bit.ly/3Jn6aqn",
      skin_name: "exlucida | Trigger Disciplineeeee",
      skin_category: "NovaSkins",
      skin_weapon: "Test skin exlucidaaaa",
      skin_price: 500,
      skin_float: "0,10072",
      seller_name: "Caçadora de demonios",
      seller_id,
      skin_rarity: "8650AC",
      status: "Pending",
      sale_type: "Caçadora",
      status_float: "Muito usada",
      skin_link_game: "/",
      skin_link_steam: "/",
    });
  }

  async createSampleProfile({
    owner_id,
    owner_name,
    total_exchanges,
    total_exchanges_completed,
    total_exchanges_failed,
    delivery_time,
  }: ICreateSampleProfileRequest) {
    const configuration = await this.configurationRepository.create({
      owner_id,
      owner_name,
      owner_email: "",
      owner_phone: "",
      owner_cpf: "",
      agreed_with_emails: false,
      agreed_with_terms: false,
      url_trade: "",
      url_sell: "",
    });

    return await this.perfilRepository.create({
      owner_id,
      owner_name,
      total_exchanges: total_exchanges ?? 0,
      total_exchanges_completed: total_exchanges_completed ?? 0,
      total_exchanges_failed: total_exchanges_failed ?? 0,
      delivery_time: delivery_time ?? "Sem informações",
      picture: "asdadasdasd",
      steam_url: "https://steamcommunity.com/profiles/76561198195920183",
      steam_created_date: "your_value_here",
      configurationId: configuration.id,
    });
  }
}
