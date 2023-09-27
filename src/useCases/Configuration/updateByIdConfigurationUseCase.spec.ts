import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryConfiguration } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";
import { UpdateByIdUseCase } from "./updateByUserConfigurationUseCase";

let configRepository: InMemoryConfiguration;
let sut: UpdateByIdUseCase;

describe("Upadate configuration", () => {
  beforeEach(() => {
    configRepository = new InMemoryConfiguration();
    sut = new UpdateByIdUseCase(configRepository);
  });

  it("Should be able to Update", async () => {
    const updateConfig = {
      owner_email: "italovital211111@gmail.com",
      owner_name: "Italooooooooooo",
    };

    await expect(() =>
      sut.execute("765611981959", updateConfig)
    ).rejects.toBeInstanceOf(ConfigurationNotExistError);
  });
});
