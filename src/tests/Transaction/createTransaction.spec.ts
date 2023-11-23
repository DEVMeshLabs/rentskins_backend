import { expect, describe, beforeEach, it, vi } from "vitest";
import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryTransactionRepository } from "@/repositories/in-memory/inMemoryTransactionRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { CannotAdvertiseSkinNotYour } from "@/useCases/@errors/Transaction/CannotAdvertiseSkinNotYour";
import { SkinHasAlreadyBeenSoldError } from "@/useCases/@errors/Transaction/SkinHasAlreadyBeenSoldError";
import { InsufficientFundsError } from "@/useCases/@errors/Wallet/InsufficientFundsError";
import { WalletNotExistsError } from "@/useCases/@errors/Wallet/WalletNotExistsError";
import { CreateTransactionUseCase } from "@/useCases/Transaction/createTransactionUseCase";
import { MockFunctions } from "../utils/mockFunctions";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";

let transactionRepository: InMemoryTransactionRepository;
let perfilRepository: InMemoryPerfilRepository;
let skinRepository: InMemorySkinRepository;
let walletRepository: InMemoryWalletRepository;
let notificationsRepository: InMemoryNotificationRepository;
let configurationRepository: InMemoryConfigurationRepository;
let mockFunction: MockFunctions;
let sut: CreateTransactionUseCase;

describe("Transaction Use Case", () => {
  beforeEach(async () => {
    transactionRepository = new InMemoryTransactionRepository();
    perfilRepository = new InMemoryPerfilRepository();
    skinRepository = new InMemorySkinRepository();
    walletRepository = new InMemoryWalletRepository();
    notificationsRepository = new InMemoryNotificationRepository();
    configurationRepository = new InMemoryConfigurationRepository();
    mockFunction = new MockFunctions(
      skinRepository,
      perfilRepository,
      configurationRepository
    );

    sut = new CreateTransactionUseCase(
      transactionRepository,
      perfilRepository,
      skinRepository,
      walletRepository,
      notificationsRepository
    );
  });

  it("Deve ser capaz de criar uma transação", async () => {
    vi.useFakeTimers();

    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
    ]);

    const vendedor = await walletRepository.create({
      owner_name: "Italo",
      owner_id: "76561199205585878",
    });

    const comprador = await walletRepository.create({
      owner_name: "Araujo",
      owner_id: "76561198195920183",
      value: 5000,
    });

    const createTransaction = await sut.execute({
      skin_id: skin.id,
      seller_id: vendedor.owner_id,
      buyer_id: comprador.owner_id,
    });

    const [getUser, buyerWallet, getTransaction] = await Promise.all([
      perfilRepository.findByUser(vendedor.owner_id),
      walletRepository.findByUser(comprador.owner_id),
      transactionRepository.findById(createTransaction.id),
    ]);

    expect(skin.id).toEqual(expect.any(String));
    expect(createTransaction.id).toEqual(expect.any(String));
    expect(createTransaction.balance).toEqual(500);
    expect(getUser.total_exchanges).toEqual(1);
    expect(buyerWallet.value).toEqual(4500);
    expect(getTransaction.status).toEqual("Em andamento");

    vi.advanceTimersByTime(10000);
  });

  it("Verificando a Existência do Perfil", async () => {
    await expect(() =>
      sut.execute({
        skin_id: "asdsadasdas",
        seller_id: "76561199205585878",
        buyer_id: "76561198195920183",
      })
    ).rejects.toBeInstanceOf(PerfilNotExistError);
  });

  it("Verificando a Existência da Skin", async () => {
    await Promise.all([
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
    ]);

    await expect(() =>
      sut.execute({
        skin_id: "sadasdasdasdasd",
        seller_id: "76561199205585878",
        buyer_id: "76561198195920183",
      })
    ).rejects.toBeInstanceOf(SkinNotExistError);
  });

  it("Verificando a Existência da Carteira", async () => {
    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
    ]);

    await expect(() =>
      sut.execute({
        skin_id: skin.id,
        seller_id: "76561199205585878",
        buyer_id: "76561198195920183",
      })
    ).rejects.toBeInstanceOf(WalletNotExistsError);
  });

  it("Verificando Saldo Insuficiente", async () => {
    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
      walletRepository.create({
        owner_name: "Italo",
        owner_id: "76561199205585878",
      }),

      walletRepository.create({
        owner_name: "Araujo",
        owner_id: "76561198195920183",
        value: 0,
      }),
    ]);

    await expect(() =>
      sut.execute({
        skin_id: skin.id,
        seller_id: "76561199205585878",
        buyer_id: "76561198195920183",
      })
    ).rejects.toBeInstanceOf(InsufficientFundsError);
  });

  it("Verificando se consigo vender skins que não são minhas", async () => {
    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      mockFunction.createSampleProfile("76561199205585877", "Tiago"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
      walletRepository.create({
        owner_name: "Italo",
        owner_id: "76561199205585878",
      }),

      walletRepository.create({
        owner_name: "Araujo",
        owner_id: "76561198195920183",
        value: 1000,
      }),
    ]);

    await expect(() =>
      sut.execute({
        skin_id: skin.id,
        seller_id: "76561199205585877",
        buyer_id: "76561198195920183",
      })
    ).rejects.toBeInstanceOf(CannotAdvertiseSkinNotYour);
  });

  it("Verificando a duplicação de anúncios da mesma skin", async () => {
    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
      walletRepository.create({
        owner_name: "Italo",
        owner_id: "76561199205585878",
      }),

      walletRepository.create({
        owner_name: "Araujo",
        owner_id: "76561198195920183",
        value: 1000,
      }),
    ]);
    await sut.execute({
      skin_id: skin.id,
      seller_id: "76561199205585878",
      buyer_id: "76561198195920183",
    });

    await expect(() =>
      sut.execute({
        skin_id: skin.id,
        seller_id: "76561199205585878",
        buyer_id: "76561198195920183",
      })
    ).rejects.toBeInstanceOf(SkinHasAlreadyBeenSoldError);
  });
});
