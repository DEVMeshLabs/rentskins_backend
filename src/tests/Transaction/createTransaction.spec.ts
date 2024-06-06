import { expect, describe, beforeEach, it, vi } from "vitest";
import { CreateTransactionUseCase } from "@/useCases/Transaction/createTransactionUseCase";
// -------------- InMemory --------------
import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryTransactionRepository } from "@/repositories/in-memory/inMemoryTransactionRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
// -------------- Error --------------
import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { InsufficientFundsError } from "@/useCases/@errors/Wallet/InsufficientFundsError";
import { WalletNotExistsError } from "@/useCases/@errors/Wallet/WalletNotExistsError";
// -------------- Error --------------
import { MakeCreateSkinRepository } from "../@factories/Skin/makeCreateSkinRepository";
import { MakeCreatePerfilRepository } from "../@factories/Perfil/makeCreatePerfilRepository";
import { InMemoryTransactionHistoryRepository } from "@/repositories/in-memory/inMemoryTransactionHistory";
import { SkinHasAlreadyBeenSoldError } from "@/useCases/@errors/Transaction/SkinHasAlreadyBeenSoldError";
import { CannotAdvertiseSkinNotYour } from "@/useCases/@errors/Transaction/CannotAdvertiseSkinNotYour";

let transactionRepository: InMemoryTransactionRepository;
let transactionHistoryRepository: InMemoryTransactionHistoryRepository;
let perfilRepository: InMemoryPerfilRepository;
let skinRepository: InMemorySkinRepository;
let walletRepository: InMemoryWalletRepository;
let notificationsRepository: InMemoryNotificationRepository;
let configurationRepository: InMemoryConfigurationRepository;
let makeCreateSkin: MakeCreateSkinRepository;
let makeCreatePerfilRepository: MakeCreatePerfilRepository;
let sut: CreateTransactionUseCase;

describe("Transaction Use Case", () => {
  beforeEach(async () => {
    transactionRepository = new InMemoryTransactionRepository();
    transactionHistoryRepository = new InMemoryTransactionHistoryRepository();
    perfilRepository = new InMemoryPerfilRepository();
    skinRepository = new InMemorySkinRepository();
    walletRepository = new InMemoryWalletRepository();
    notificationsRepository = new InMemoryNotificationRepository();
    configurationRepository = new InMemoryConfigurationRepository();

    makeCreateSkin = new MakeCreateSkinRepository(skinRepository);
    makeCreatePerfilRepository = new MakeCreatePerfilRepository(
      perfilRepository,
      configurationRepository
    );

    sut = new CreateTransactionUseCase(
      transactionRepository,
      transactionHistoryRepository,
      perfilRepository,
      skinRepository,
      walletRepository,
      notificationsRepository,
      configurationRepository
    );
  });

  it("Deve ser capaz de criar uma transação", async () => {
    vi.useFakeTimers();

    const [skin] = await Promise.all([
      makeCreateSkin.execute({
        seller_id: "76561199205585878",
        asset_id: "123456",
      }),
      makeCreatePerfilRepository.execute("76561199205585878"),
      makeCreatePerfilRepository.execute("76561198195920183"),
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

    const [getUser, , getTransaction] = await Promise.all([
      perfilRepository.findByUser(vendedor.owner_id),
      walletRepository.findByUser(comprador.owner_id),
      transactionRepository.findById(createTransaction.id),
    ]);
    expect(skin.id).toEqual(expect.any(String));
    expect(createTransaction.id).toEqual(expect.any(String));
    expect(createTransaction.balance).toEqual(skin.skin_price);
    expect(getUser.total_exchanges).toEqual(1);
    expect(getTransaction.status).toEqual("Default");
    expect(skinRepository.skins[0].status).toEqual("Em andamento");
    vi.advanceTimersByTime(5000);
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
      makeCreatePerfilRepository.execute("76561199205585878"),
      makeCreatePerfilRepository.execute("76561198195920183"),
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
      makeCreateSkin.execute({
        seller_id: "76561199205585878",
      }),
      makeCreatePerfilRepository.execute("76561199205585878"),
      makeCreatePerfilRepository.execute("76561198195920183"),
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
      makeCreateSkin.execute({
        seller_id: "76561199205585878",
      }),
      makeCreatePerfilRepository.execute("76561199205585878"),
      makeCreatePerfilRepository.execute("76561198195920183"),

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
      makeCreateSkin.execute({
        seller_id: "76561199205585878",
      }),
      makeCreatePerfilRepository.execute("76561199205585878"),
      makeCreatePerfilRepository.execute("76561198195920183"),
      makeCreatePerfilRepository.execute("76561199205585877"),

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
      makeCreateSkin.execute({
        seller_id: "76561199205585878",
      }),
      makeCreatePerfilRepository.execute("76561199205585878"),
      makeCreatePerfilRepository.execute("76561198195920183"),
      walletRepository.create({
        owner_name: "Italo",
        owner_id: "76561199205585878",
      }),

      walletRepository.create({
        owner_name: "Araujo",
        owner_id: "76561198195920183",
        value: 10000,
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

  it("Verificando se consigo vender uma skin em fase de transação", async () => {
    const [skin] = await Promise.all([
      makeCreateSkin.execute({
        seller_id: "76561199205585878",
      }),
      makeCreatePerfilRepository.execute("76561199205585878"),
      makeCreatePerfilRepository.execute("76561198195920183"),
      walletRepository.create({
        owner_name: "Italo",
        owner_id: "76561199205585878",
      }),

      walletRepository.create({
        owner_name: "Araujo",
        owner_id: "76561198195920183",
        value: 10000,
      }),
    ]);

    const createTransaction = await sut.execute({
      skin_id: skin.id,
      seller_id: "76561199205585878",
      buyer_id: "76561198195920183",
      status: "NegociationRejected",
    });

    await transactionRepository.updateStatus(
      createTransaction.id,
      "NegociationRejected"
    );

    const createTransaction2 = await sut.execute({
      skin_id: skin.id,
      seller_id: "76561199205585878",
      buyer_id: "76561198195920183",
    });
    console.log("ESSE", createTransaction2);

    expect(createTransaction2.status).toEqual("Default");
  });
});
