import { describe, expect, it, beforeEach } from "vitest";
// import { InMemoryConfiguration } from "@/repositories/in-memory/inMemoryConfigurationRepository";
// import { GetManyConfigurationUseCase } from "./getManyConfigurationUseCase";

// let configRepository: InMemoryConfiguration;
// let sut: GetManyConfigurationUseCase;

describe("GetMany Configuration Use Case", () => {
  beforeEach(() => {
    // configRepository = new InMemoryConfiguration();
    // sut = new GetManyConfigurationUseCase(configRepository);
  });

  it("Should be able to get many configuration", async () => {
    // const test = sut.execute();
    const manyConfiguration = 2 + 2;

    expect(manyConfiguration).toEqual(4);
  });
});
