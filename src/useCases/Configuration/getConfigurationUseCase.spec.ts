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

  it("Should not be able to get configuration with wrong id", async () => {
    await expect(() => sut.execute("651561")).rejects.toBeInstanceOf(
      ConfigurationNotExistError
    );
  });
});
