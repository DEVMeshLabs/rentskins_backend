import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryConfiguration } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { GetConfigurationUseCase } from "./getConfigurationUseCase";
import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";

let configRepository: InMemoryConfiguration;
let sut: GetConfigurationUseCase;

describe("Get Configuration Use Case", () => {
  beforeEach(() => {
    configRepository = new InMemoryConfiguration();
    sut = new GetConfigurationUseCase(configRepository);
  });

  it("Should be able to get configuration", async () => {
    const createConfig = await configRepository.create({
      owner_id: "76561198195920183",
      owner_email: "italovital21@gmail.com",
      owner_name: "Italo Araujo",
      url_sell: "/",
      url_trade: "/",
      steam_guard: false,
      agreed_with_emails: false,
      agreed_with_terms: false,
    });

    const { owner_email } = await sut.execute(createConfig.id);

    expect(owner_email).toEqual("italovital21@gmail.com");
  });

  it("Should not be able to get configuration with wrong id", async () => {
    await expect(() => sut.execute("651561")).rejects.toBeInstanceOf(
      ConfigurationNotExistError
    );
  });
});
