import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryConfiguration } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { GetUserConfigurationUseCase } from "./getUserConfigurationUSeCase";
import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";

let configRepository: InMemoryConfiguration;
let sut: GetUserConfigurationUseCase;

describe("Get User Configuration Use Case", () => {
  beforeEach(() => {
    configRepository = new InMemoryConfiguration();
    sut = new GetUserConfigurationUseCase(configRepository);
  });

  it("Should not be able to get user configuration with wrong id", async () => {
    await expect(() => sut.execute("76561198195920183")).rejects.toBeInstanceOf(
      ConfigurationNotExistError
    );
  });
});
