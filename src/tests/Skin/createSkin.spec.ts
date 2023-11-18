import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { SkinAlreadyExistsError } from "@/useCases/@errors/Skin/SkinAlreadyExistsError";
import { CreateSkinUseCase } from "@/useCases/Skin/createSkinUseCase";
import { expect, describe, beforeEach, it } from "vitest";

let skinRepository: InMemorySkinRepository;
let sut: CreateSkinUseCase;

describe("Skin Use Case", () => {
  beforeEach(async () => {
    skinRepository = new InMemorySkinRepository();
    sut = new CreateSkinUseCase(skinRepository);
  });

  it("Deve ser capaz de criar uma skin", async () => {
    const skin = await sut.execute({
      asset_id: "10828437704",
      skin_image: "https://bit.ly/3Jn6aqn",
      skin_name: "exlucida | Trigger Disciplineeeee",
      skin_category: "Nova skinsnnnn",
      skin_weapon: "Test skin exlucidaaaa",
      skin_price: 550,
      skin_float: "0,10072",
      seller_name: "Caçadora de demonios",
      seller_id: "76561199205585878",
      skin_rarity: "8650AC",
      sale_type: "Caçadora",
      status_float: "Muito usada",
      skin_link_game: "/",
      skin_link_steam: "/",
    });

    expect(skin.id).toEqual(expect.any(String));
  });

  it("Não deve ser possível registrar com o mesmo asset_id", async () => {
    const data = {
      asset_id: "10828437704",
      skin_image: "https://bit.ly/3Jn6aqn",
      skin_name: "exlucida | Trigger Disciplineeeee",
      skin_category: "Nova skinsnnnn",
      skin_weapon: "Test skin exlucidaaaa",
      skin_price: 550,
      skin_float: "0,10072",
      median_price: 253,
      seller_name: "Caçadora de demonios",
      seller_id: "76561199205585878",
      skin_rarity: "8650AC",
      sale_type: "Caçadora",
      status_float: "Muito usada",
      skin_link_game: "/",
      skin_link_steam: "/",
    };

    await sut.execute(data);
    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      SkinAlreadyExistsError
    );
  });

  it("Deve ser capaz de criar duas skins", async () => {
    const data = {
      asset_id: "10828437704",
      skin_image: "https://bit.ly/3Jn6aqn",
      skin_name: "exlucida | Trigger Disciplineeeee",
      skin_category: "Nova skinsnnnn",
      skin_weapon: "Test skin exlucidaaaa",
      skin_price: 550,
      skin_float: "0,10072",
      median_price: 253,
      seller_name: "Caçadora de demonios",
      seller_id: "76561199205585878",
      skin_rarity: "8650AC",
      sale_type: "Caçadora",
      status_float: "Muito usada",
      skin_link_game: "/",
      skin_link_steam: "/",
    };

    const data2 = {
      asset_id: "20828436604",
      skin_image: "https://bit.ly/3Jn6aqn",
      skin_name: "A New Skin | Trigger Discipline",
      skin_category: "Teste skin secundaria",
      skin_weapon: "Test skin secundaria",
      skin_price: 550,
      skin_float: "0,10072",
      median_price: 253,
      seller_name: "Caçadora de demonios",
      seller_id: "76561199205585878",
      skin_rarity: "8650AC",
      sale_type: "Caçadora",
      status_float: "Muito usada",
      skin_link_game: "/",
      skin_link_steam: "/",
    };

    const skin1 = await sut.execute(data);
    const skin2 = await sut.execute(data2);

    expect(skin1.id).toEqual(expect.any(String));
    expect(skin2.id).toEqual(expect.any(String));
  });
});
