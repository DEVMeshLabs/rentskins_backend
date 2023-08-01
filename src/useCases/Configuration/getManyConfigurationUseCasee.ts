import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryConfiguration } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { GetManyConfigurationUseCase } from "./getManyConfigurationUseCase";

let configRepository: InMemoryConfiguration;
let sut: GetManyConfigurationUseCase;

describe("GetMany Configuration Use Case", () => {
  beforeEach(() => {
    configRepository = new InMemoryConfiguration();
    sut = new GetManyConfigurationUseCase(configRepository);
  });

  it("Should be able to get many configuration", async () => {
    await configRepository.create({
      owner_id: "76561198195920183",
      owner_email: "italovital21@gmail.com",
      owner_name: "Italo Araujo",
      url_sell: "/",
      url_trade: "/",
      steam_guard: false,
      agreed_with_emails: false,
      agreed_with_terms: false,
    });

    await configRepository.create({
      owner_id: "76561198195920183",
      owner_email: "italovital21@gmail.com",
      owner_name: "Italo Araujo",
      url_sell: "/",
      url_trade: "/",
      steam_guard: false,
      agreed_with_emails: false,
      agreed_with_terms: false,
    });
    const manyConfiguration = await sut.execute();
    expect(manyConfiguration.length).toEqual(2);
  });
});
