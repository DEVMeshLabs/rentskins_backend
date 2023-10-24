import { InMemoryConfiguration } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { CreatePerfilUseCase } from "@/useCases/Perfil/createPerfilUseCase";
import { expect, describe, beforeEach, it } from "vitest";

let perfilRepository: InMemoryPerfilRepository;
let configurationRepository: InMemoryConfiguration;
let sut: CreatePerfilUseCase;

describe("Perfil Use Case", () => {
  beforeEach(async () => {
    configurationRepository = new InMemoryConfiguration();
    perfilRepository = new InMemoryPerfilRepository();
    sut = new CreatePerfilUseCase(perfilRepository, configurationRepository);
  });

  it("should be able to create a Perfil and configuration", async () => {
    const perfil = await sut.execute(
      {
        owner_id: "76561198195920183",
        owner_name: "Italo araújo",
        owner_email: "",
        owner_phone: "",
        owner_cpf: "",
        url_sell: "",
        url_trade: "",
        agreed_with_emails: false,
        agreed_with_terms: false,
      },
      {
        owner_id: "76561198195920183",
        owner_name: "Italo araújo",
        owner_country: "BR",
        steam_created_date: "",
        steam_level: 20,
        picture: "adadadadasd",
        steam_url: "https://steamcommunity.com/profiles/76561198195920183",
      }
    );

    expect(perfil.id).toEqual(expect.any(String));
  });
});
