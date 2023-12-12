import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export class MakeCreateSkinRepository {
  constructor(private skinRepository: InMemorySkinRepository) {}

  async execute(override: Partial<Prisma.SkinCreateInput> = {}) {
    return this.skinRepository.create({
      asset_id: `${faker.number.int({ min: 1, max: 100 })}`,
      skin_image: "https://bit.ly/3Jn6aqn",
      skin_name: faker.lorem.sentence(),
      skin_category: "Pistol",
      skin_weapon: "Test skin exlucida",
      skin_price: faker.number.int({ min: 50, max: 1000 }),
      skin_float: "0,10072",
      seller_name: "Caçadora de demonios",
      seller_id: "",
      skin_rarity: "8650AC",
      status: "Pending",
      sale_type: "Caçadora",
      status_float: "Muito usada",
      skin_link_game: "/",
      skin_link_steam: "/",
      ...override,
    });
  }
}
