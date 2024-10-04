import { expect, describe, beforeEach, it } from "vitest";
import { CreateSkinUseCase } from "@/useCases/Skin/createSkinUseCase";
// -------------- InMemory --------------
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
// -------------- Error --------------
import { SkinAlreadyExistsError } from "@/useCases/@errors/Skin/SkinAlreadyExistsError";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { MakeCreatePerfilRepository } from "../@factories/Perfil/makeCreatePerfilRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemoryTransactionRepository } from "@/repositories/in-memory/inMemoryTransactionRepository";

let skinRepository: InMemorySkinRepository;
let configRepostiory: InMemoryConfigurationRepository;
let perfilRepository: InMemoryPerfilRepository;
let transactionRepository: InMemoryTransactionRepository;
let makeCreatePerfilRepository: MakeCreatePerfilRepository;
let sut: CreateSkinUseCase;

describe("Skin Use Case", () => {
  beforeEach(async () => {
    skinRepository = new InMemorySkinRepository();
    configRepostiory = new InMemoryConfigurationRepository();
    perfilRepository = new InMemoryPerfilRepository();
    transactionRepository = new InMemoryTransactionRepository();
    makeCreatePerfilRepository = new MakeCreatePerfilRepository(
      perfilRepository,
      configRepostiory
    );

    sut = new CreateSkinUseCase(
      skinRepository,
      configRepostiory,
      transactionRepository
    );
  });

  it("Deve ser capaz de criar uma skin", async () => {
    await Promise.all([
      makeCreatePerfilRepository.execute(
        "76561198015724229",
        "DBBF677F1392F52023DC909D966F7516"
      ),
      makeCreatePerfilRepository.execute("76561198862407248"),
    ]);

    const skin = await sut.execute({
      asset_id: "10828437704",
      skin_image: "https://bit.ly/3Jn6aqn",
      skin_name: "exlucida | Trigger Disciplineeeee",
      skin_category: "Nova skinsnnnn",
      skin_weapon: "Test skin exlucidaaaa",
      skin_price: 550,
      skin_float: "0,10072",
      seller_name: "Caçadora de demonios",
      seller_id: "76561198015724229",
      skin_rarity: "8650AC",
      sale_type: "Caçadora",
      status_float: "Muito usada",
      skin_link_game: "/",
      skin_link_steam: "/",
      skin_paintseed: 123456,
      skin_market_hash_name: "",
      skin_classid: "",
      skin_instanceid: "",
      pricesafe7d: 0,
    });
    expect(skin.id).toEqual(expect.any(String));
  });

  it("Não deve ser possível registrar com o mesmo asset_id", async () => {
    await Promise.all([
      makeCreatePerfilRepository.execute(
        "76561198015724229",
        "DBBF677F1392F52023DC909D966F7516"
      ),
      makeCreatePerfilRepository.execute("76561198862407248"),
    ]);

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
      seller_id: "76561198015724229",
      skin_rarity: "8650AC",
      sale_type: "Caçadora",
      status_float: "Muito usada",
      skin_link_game: "/",
      skin_link_steam: "/",
      skin_market_hash_name: "",
      skin_classid: "",
      skin_instanceid: "",
      skin_paintseed: 123457,
      pricesafe7d: 0,
    };

    await sut.execute(data);
    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      SkinAlreadyExistsError
    );
  });

  it("Deve ser capaz de criar duas skins", async () => {
    await Promise.all([
      makeCreatePerfilRepository.execute(
        "76561198015724229",
        "DBBF677F1392F52023DC909D966F7516"
      ),
      makeCreatePerfilRepository.execute(
        "76561198862407248",
        "DBBF677F1392F52023DC909D966F7517"
      ),
    ]);

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
      seller_id: "76561198015724229",
      skin_rarity: "8650AC",
      sale_type: "Caçadora",
      status_float: "Muito usada",
      skin_link_game: "/",
      skin_link_steam: "/",
      skin_market_hash_name: "",
      skin_classid: "",
      skin_instanceid: "",
      skin_paintseed: 123458,
      pricesafe7d: 0,
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
      seller_id: "76561198015724229",
      skin_rarity: "8650AC",
      sale_type: "Caçadora",
      status_float: "Muito usada",
      skin_link_game: "/",
      skin_link_steam: "/",
      skin_market_hash_name: "A New Skin | Trigger Discipline hash name",
      skin_classid: "",
      skin_instanceid: "",
      skin_paintseed: 123459,
      pricesafe7d: 0,
    };

    const skin1 = await sut.execute(data);
    const skin2 = await sut.execute(data2);

    expect(skin1.id).toEqual(expect.any(String));
    expect(skin2.id).toEqual(expect.any(String));
  });

  // it("Não deve ser possível criar uma skin em transação", async () => {
  //   await Promise.all([
  //     makeCreatePerfilRepository.execute(
  //       "76561198015724229",
  //       "DBBF677F1392F52023DC909D966F7516"
  //     ),
  //     makeCreatePerfilRepository.execute(
  //       "76561198862407248",
  //       "DBBF677F1392F52023DC909D966F7517"
  //     ),
  //   ]);

  //   const vendedor = await walletRepository.create({
  //     owner_name: "Italo",
  //     owner_id: "76561198015724229",
  //   });

  //   const comprador = await walletRepository.create({
  //     owner_name: "Araujo",
  //     owner_id: "76561198862407248",
  //     value: 5000,
  //   });

  //   const data = {
  //     asset_id: "20828436604",
  //     skin_image: "https://bit.ly/3Jn6aqn",
  //     skin_name: "A New Skin | Trigger Discipline",
  //     skin_category: "Teste skin secundaria",
  //     skin_weapon: "Test skin secundaria",
  //     skin_price: 550,
  //     skin_float: "0,10072",
  //     median_price: 253,
  //     seller_name: "Caçadora de demonios",
  //     seller_id: "76561198015724229",
  //     skin_rarity: "8650AC",
  //     sale_type: "Caçadora",
  //     status_float: "Muito usada",
  //     skin_link_game: "/",
  //     skin_link_steam: "/",
  //     skin_market_hash_name: "A New Skin | Trigger Discipline hash name",
  //     skin_classid: "",
  //     skin_instanceid: "",
  //     skin_paintseed: 123459,
  //     pricesafe7d: 0,
  //   };

  //   const skin1 = await sut.execute(data);

  //   await transactionRepository.create({
  //     skin_id: skin1.id,
  //     seller_id: vendedor.owner_id,
  //     buyer_id: comprador.owner_id,
  //     balance: skin1.skin_price,
  //   });

  //   const data2 = {
  //     asset_id: "20828436604",
  //     skin_image: "https://bit.ly/3Jn6aqn",
  //     skin_name: "A New Skin | Trigger Discipline",
  //     skin_category: "Teste skin secundaria",
  //     skin_weapon: "Test skin secundaria",
  //     skin_price: 550,
  //     skin_float: "0,10072",
  //     median_price: 253,
  //     seller_name: "Caçadora de demonios",
  //     seller_id: "76561198015724229",
  //     skin_rarity: "8650AC",
  //     sale_type: "Caçadora",
  //     status_float: "Muito usada",
  //     skin_link_game: "/",
  //     skin_link_steam: "/",
  //     skin_market_hash_name: "A New Skin | Trigger Discipline hash name",
  //     skin_classid: "",
  //     skin_instanceid: "",
  //     skin_paintseed: 123459,
  //     pricesafe7d: 0,
  //   };

  //   const skin2 = await sut.execute(data2);

  //   expect(skin1.id).toEqual(expect.any(String));
  //   expect(skin2.id).toEqual(expect.any(String));
  // });
});
