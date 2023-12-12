import { InMemoryCartRepository } from "@/repositories/in-memory/inMemoryCartRepository";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { VerifyAccountVacBanError } from "@/useCases/@errors/Perfil/VerifyAccountVacBanError";
import { CreatePerfilUseCase } from "@/useCases/Perfil/createPerfilUseCase";
import { expect, describe, beforeEach, it } from "vitest";

let perfilRepository: InMemoryPerfilRepository;
let configurationRepository: InMemoryConfigurationRepository;
let walletRepository: InMemoryWalletRepository;
let cartRepository: InMemoryCartRepository;
let sut: CreatePerfilUseCase;

describe("Perfil Use Case", () => {
  beforeEach(async () => {
    perfilRepository = new InMemoryPerfilRepository();
    configurationRepository = new InMemoryConfigurationRepository();
    walletRepository = new InMemoryWalletRepository();
    cartRepository = new InMemoryCartRepository();
    sut = new CreatePerfilUseCase(
      perfilRepository,
      configurationRepository,
      walletRepository,
      cartRepository
    );
  });

  it("Deve ser capaz de criar um perfil, configuração, wallet e cart", async () => {
    const createPerfil = await sut.execute({
      owner_id: "76561198195920183",
      owner_name: "Italo araújo",
      owner_country: "BR",
      steam_created_date: "",
      picture: "adadadadasd",
      steam_url: "https://steamcommunity.com/profiles/76561198195920183",
      total_exchanges: 0,
      total_exchanges_completed: 0,
      total_exchanges_failed: 0,
      delivery_time: "",
    });

    const configuration = configurationRepository.config;
    const wallet = walletRepository.wallet;
    const cart = cartRepository.cart;

    expect(createPerfil.id).toEqual(expect.any(String));
    expect(configuration.length).toEqual(1);
    expect(wallet.length).toEqual(1);
    expect(cart.length).toEqual(1);
  });

  it("Deve retornar um erro VerifyAccountVacBanError ao passar um ID com VAC Ban", async () => {
    await expect(() =>
      sut.execute({
        owner_id: "76561198274650319",
        owner_name: "Italo araújo",
        owner_country: "BR",
        steam_created_date: "",
        picture: "adadadadasd",
        steam_url: "https://steamcommunity.com/profiles/76561198195920183",
        total_exchanges: 0,
        total_exchanges_completed: 0,
        total_exchanges_failed: 0,
        delivery_time: "",
      })
    ).rejects.toBeInstanceOf(VerifyAccountVacBanError);
  });
});
