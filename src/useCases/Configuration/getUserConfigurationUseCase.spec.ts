// import { describe, expect, it, beforeEach } from "vitest";
// import { InMemoryConfiguration } from "@/repositories/in-memory/inMemoryConfigurationRepository";
// import { GetUserConfigurationUseCase } from "./getUserConfigurationUSeCase";
// import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";

// let configRepository: InMemoryConfiguration;
// let sut: GetUserConfigurationUseCase;

// describe("Get User Configuration Use Case", () => {
//   beforeEach(() => {
//     configRepository = new InMemoryConfiguration();
//     sut = new GetUserConfigurationUseCase(configRepository);
//   });

//   it("Should be able to get user configuration", async () => {
//     const createConfig = await configRepository.create({
//       owner_id: "76561198195920183",
//       owner_email: "italovital21@gmail.com",
//       owner_name: "Italo Araujo",
//       url_sell: "/",
//       url_trade: "/",
//       steam_guard: false,
//       agreed_with_emails: false,
//       agreed_with_terms: false,
//     });

//     const { owner_id } = await sut.execute(createConfig.owner_id);

//     expect(owner_id).toEqual("76561198195920183");
//   });

//   it("Should not be able to get user configuration with wrong id", async () => {
//     await expect(() => sut.execute("76561198195920183")).rejects.toBeInstanceOf(
//       ConfigurationNotExistError
//     );
//   });
// });
