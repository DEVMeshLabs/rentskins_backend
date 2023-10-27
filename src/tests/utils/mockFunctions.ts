import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";

export class MockFunctions {
  constructor(
    private skinRepository: InMemorySkinRepository,
    private perfilRepository: InMemoryPerfilRepository
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
      median_price: 253,
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

  async createSampleProfile(owner_id: string, owner_name: string) {
    return await this.perfilRepository.create({
      owner_id,
      owner_name,
      picture: "asdadasdasd",
      steam_url: "https://steamcommunity.com/profiles/76561198195920183",
      steam_level: 0,
      steam_created_date: "your_value_here",
    });
  }
}
