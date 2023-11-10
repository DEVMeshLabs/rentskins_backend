// import { InMemoryConfiguration } from "@/repositories/in-memory/inMemoryConfigurationRepository";
// import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
// import { UpdateByUserConfigurationUseCase } from "@/useCases/Configuration/updateByUserConfigurationUseCase";
// import { CreatePerfilUseCase } from "@/useCases/Perfil/createPerfilUseCase";
// import { expect, describe, beforeEach, it } from "vitest";

// let perfilRepository: InMemoryPerfilRepository;
// let configurationRepository: InMemoryConfiguration;
// let sut: UpdateByUserConfigurationUseCase;

// describe("Configuration Use Case", () => {
//   beforeEach(async () => {
//     configurationRepository = new InMemoryConfiguration();
//     perfilRepository = new InMemoryPerfilRepository();
//     sut = new UpdateByUserConfigurationUseCase(configurationRepository);
//   });

//   it("Deve ser capaz de atualizar um campo", async () => {
//     const createPerfil = await perfilRepository.create({
//       owner_id: "76561198195920183",
//       owner_name: "Italo araújo",
//       owner_email: "",
//       owner_phone: "",
//       owner_cpf: "",
//       url_sell: "",
//       url_trade: "",
//       agreed_with_emails: false,
//       agreed_with_terms: false,
//     });

//     const createConfiguration = await configurationRepository.create({
//       owner_id: "76561198195920183",
//       owner_name: "Italo araújo",
//       owner_country: "BR",
//       steam_created_date: "",
//       picture: "adadadadasd",
//       steam_url: "https://steamcommunity.com/profiles/76561198195920183",
//     });

//     expect(createPerfil.id).toEqual(expect.any(String));
//   });
// });
