// import { describe, expect, it, beforeEach } from "vitest";
// import { InMemoryConfiguration } from "@/repositories/in-memory/inMemoryConfigurationRepository";
// import { UpdateByIdUseCase } from "./updateByIdConfigurationUseCase";
// import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";

// let configRepository: InMemoryConfiguration;
// let sut: UpdateByIdUseCase;

// describe("Upadate configuration", () => {
//   beforeEach(() => {
//     configRepository = new InMemoryConfiguration();
//     sut = new UpdateByIdUseCase(configRepository);
//   });

//   it("Should be able to Update", async () => {
//     const { id, owner_id } = await configRepository.create({
//       owner_id: "1235874",
//       owner_email: "italovital21@gmail.com",
//       owner_name: "Italo Araujo",
//       url_sell: "/",
//       url_trade: "/",
//       steam_guard: false,
//       agreed_with_emails: false,
//       agreed_with_terms: false,
//     });

//     const updateConfig = {
//       owner_email: "italovital211111@gmail.com",
//       owner_name: "Italooooooooooo",
//       updatedAt: new Date(),
//     };

//     const { owner_email } = await sut.execute(id, updateConfig);

//     expect(owner_id).toEqual("1235874");
//     expect(owner_email).toEqual("italovital211111@gmail.com");
//   });

//   it("Should be able to Update", async () => {
//     const updateConfig = {
//       owner_email: "italovital211111@gmail.com",
//       owner_name: "Italooooooooooo",
//     };

//     await expect(() =>
//       sut.execute("765611981959", updateConfig)
//     ).rejects.toBeInstanceOf(ConfigurationNotExistError);
//   });
// });
