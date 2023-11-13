import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { VerifyAccountVacBanError } from "@/useCases/@errors/Perfil/VerifyAccountVacBanError";
import { CreatePerfilUseCase } from "@/useCases/Perfil/createPerfilUseCase";
import { expect, describe, beforeEach, it } from "vitest";

let perfilRepository: InMemoryPerfilRepository;
let configurationRepository: InMemoryConfigurationRepository;
let sut: CreatePerfilUseCase;

describe("Perfil Use Case", () => {
  beforeEach(async () => {
    perfilRepository = new InMemoryPerfilRepository();
    configurationRepository = new InMemoryConfigurationRepository();
    sut = new CreatePerfilUseCase(perfilRepository, configurationRepository);
  });

  it("Deve ser capaz de criar um perfil e uma configuração", async () => {
    const createPerfil = await sut.execute(
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
        picture: "adadadadasd",
        steam_url: "https://steamcommunity.com/profiles/76561198195920183",
      }
    );

    expect(createPerfil.id).toEqual(expect.any(String));
  });

  it("Deve retornar um erro VerifyAccountVacBanError ao passar um ID com VAC Ban", async () => {
    await expect(() =>
      sut.execute(
        {
          owner_id: "76561198274650319",
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
          owner_id: "76561198274650319",
          owner_name: "Italo araújo",
          owner_country: "BR",
          steam_created_date: "",
          picture: "adadadadasd",
          steam_url: "https://steamcommunity.com/profiles/76561198274650319",
        }
      )
    ).rejects.toBeInstanceOf(VerifyAccountVacBanError);
  });
});
