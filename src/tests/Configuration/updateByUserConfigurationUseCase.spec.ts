import { InMemoryConfiguration } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { ConfigurationAlreadyExistCpfError } from "@/useCases/@errors/Configuration/ConfigurationAlreadyExistCpfError";
import { ConfigurationNotExistError } from "@/useCases/@errors/Configuration/ConfigurationNotExistError";
import { UpdateByUserConfigurationUseCase } from "@/useCases/Configuration/updateByUserConfigurationUseCase";
import { expect, describe, beforeEach, it } from "vitest";

let configurationRepository: InMemoryConfiguration;
let sut: UpdateByUserConfigurationUseCase;

describe("Configuration Use Case", () => {
  beforeEach(async () => {
    configurationRepository = new InMemoryConfiguration();
    sut = new UpdateByUserConfigurationUseCase(configurationRepository);
  });

  it("Deve ser capaz de atualizar uma configuração", async () => {
    const createConfig = await configurationRepository.create({
      owner_id: "76561198195920183",
      owner_email: "italoarauju2019@gmail.com",
      owner_name: "Italo",
      owner_phone: "(82) 1111-1111",
      owner_cpf: "111.111.111-11",
      url_sell: "",
      url_trade: "",
      agreed_with_emails: true,
      agreed_with_terms: true,
    });

    const updateConfig = await sut.execute(createConfig.owner_id, {
      owner_email: "italoarauju2021@gmail.com",
      owner_cpf: "222.222.222-22",
      owner_phone: "(82) 2222-2222",
      url_sell: "test",
      url_trade: "test",
    });

    expect(updateConfig.owner_email).toEqual("italoarauju2021@gmail.com");
  });

  it("Deve ser capaz de atualizar um campo 2 vezes do mesmo user sem da erro com o mesmo email que ja existe", async () => {
    const createConfig = await configurationRepository.create({
      owner_id: "76561198195920183",
      owner_email: "italoarauju2019@gmail.com",
      owner_name: "Italo",
      owner_phone: "(82) 1111-1111",
      owner_cpf: "111.111.111-11",
      url_sell: "",
      url_trade: "",
      agreed_with_emails: true,
      agreed_with_terms: true,
    });

    await sut.execute(createConfig.owner_id, {
      owner_email: "italoarauju2021@gmail.com",
    });

    const updateConfig = await sut.execute(createConfig.owner_id, {
      owner_email: "italoarauju2021@gmail.com",
    });

    expect(updateConfig.owner_email).toEqual("italoarauju2021@gmail.com");
  });

  it("Deve gerar um erro de Configuration not exist", async () => {
    await expect(() =>
      sut.execute("asdasdasd5161", {
        owner_email: "italoarauju2021@gmail.com",
      })
    ).rejects.toBeInstanceOf(ConfigurationNotExistError);
  });

  it("Deve gerar um erro de Email ja cadastrado no sistema", async () => {
    const createConfig = await configurationRepository.create({
      owner_id: "76561198195920183",
      owner_email: "italoarauju2019@gmail.com",
      owner_name: "Italo",
      owner_phone: "(82) 1111-1111",
      owner_cpf: "111.111.111-11",
      url_sell: "",
      url_trade: "",
      agreed_with_emails: true,
      agreed_with_terms: true,
    });

    const createConfig1 = await configurationRepository.create({
      owner_id: "76561198195920182",
      owner_email: "italoarauju2019@gmail.com",
      owner_name: "Italo",
      owner_phone: "(82) 1111-1111",
      owner_cpf: "111.111.111-11",
      url_sell: "",
      url_trade: "",
      agreed_with_emails: true,
      agreed_with_terms: true,
    });

    await sut.execute(createConfig.owner_id, {
      owner_email: "italoarauju2021@gmail.com",
    });

    await expect(() =>
      sut.execute(createConfig1.owner_id, {
        owner_email: "italoarauju2021@gmail.com",
      })
    ).rejects.toBeInstanceOf(ConfigurationAlreadyExistCpfError);
  });
});
