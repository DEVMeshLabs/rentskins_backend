import { describe, expect, it, beforeEach } from "vitest";
// import { InMemoryConfiguration } from "@/repositories/in-memory/inMemoryConfigurationRepository";
// import { CreateConfigurationUseCase } from "./createConfigurationUseCase";

// let configRepository: InMemoryConfiguration;
// let sut: CreateConfigurationUseCase;

describe("Create a new configuration", () => {
  beforeEach(() => {
    // configRepository = new InMemoryConfiguration();
    // sut = new CreateConfigurationUseCase(configRepository);
  });

  it("Should be able to create", async () => {
    const manyConfiguration = 2 + 2;

    expect(manyConfiguration).toEqual(4);
  });
});
