// import { describe, expect, it, beforeEach } from "vitest";
// import { InMemoryConfiguration } from "@/repositories/in-memory/inMemoryConfigurationRepository";
// import { CreateConfigurationUseCase } from "./createConfigurationUseCase";
// import { ConfigurationAlreadyExistError } from "../@errors/Configuration/ConfigurationAlreadyExistError";

// let configRepository: InMemoryConfiguration;
// let sut: CreateConfigurationUseCase;

// describe("Create a new configuration", () => {
//   beforeEach(() => {
//     configRepository = new InMemoryConfiguration();
//     sut = new CreateConfigurationUseCase(configRepository);
//   });

//   it("Should be able to create", async () => {
//     const { id } = await sut.execute({
//       owner_id: "76561198195920183",
//       owner_email: "italovital21@gmail.com",
//       owner_name: "Italo Araujo",
//       url_sell: "/",
//       url_trade: "/",
//       steam_guard: false,
//       agreed_with_emails: false,
//       agreed_with_terms: false,
//     });

//     expect(id).toEqual(expect.any(String));
//   });

//   it("Should not be able to register with same owner_id twice", async () => {
//     const owner_id = "76561198195920183";
//     await sut.execute({
//       owner_id,
//       owner_email: "italovital21@gmail.com",
//       owner_name: "Italo Araujo",
//       url_sell: "/",
//       url_trade: "/",
//       steam_guard: false,
//       agreed_with_emails: false,
//       agreed_with_terms: false,
//     });

//     await expect(() =>
//       sut.execute({
//         owner_id,
//         owner_email: "italovital21@gmail.com",
//         owner_name: "Italo Araujo",
//         url_sell: "/",
//         url_trade: "/",
//         steam_guard: false,
//         agreed_with_emails: false,
//         agreed_with_terms: false,
//       })
//     ).rejects.toBeInstanceOf(ConfigurationAlreadyExistError);
//   });
// });
