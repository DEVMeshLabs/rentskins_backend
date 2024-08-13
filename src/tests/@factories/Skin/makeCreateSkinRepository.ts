import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class MakeCreateSkinRepository {
  constructor(private skinRepository: InMemorySkinRepository) {}

  async execute(
    asset_id?: string,
    seller_id?: string,
    override: Partial<Prisma.SkinCreateInput> = {}
  ) {
    return this.skinRepository.create({
      id: randomUUID(),
      asset_id: asset_id || `${faker.number.int({ min: 1, max: 100 })}`,
      skin_image: "https://bit.ly/3Jn6aqn",
      skin_name: faker.lorem.sentence(),
      skin_category: "Pistol",
      skin_weapon: "Test skin exlucida",
      skin_price: 500,
      skin_float: "0,10072",
      seller_name: "Caçadora de demonios",
      seller_id: seller_id || "",
      skin_rarity: "8650AC",
      status: "Pending",
      skin_wear: "FN",
      skin_stickers: [],
      sale_type: ["sale", "rental"],
      status_float: "Muito usada",
      skin_color: "FFFFFF",
      skin_border_color: "000000",
      pricesafe7d: 500,
      skin_classid: "123446",
      skin_paintseed: 123556,
      skin_instanceid: "123656",
      skin_market_hash_name: "Teste",
      skin_link_game: "/",
      skin_link_steam: "/",
      ...override,
    });
  }
}
