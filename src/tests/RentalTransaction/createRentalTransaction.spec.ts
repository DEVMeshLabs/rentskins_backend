import { expect, describe, beforeEach, it, vi, afterEach } from "vitest";
import { CreateRentalTransactionUseCase } from "@/useCases/RentalTransaction/createRentalTransactionUseCase";
// import nock from "nock";
// import getHistoric from "../fixures/getItensHistoric.json";
// -------------- InMemory --------------
import { InMemoryRentalTransactionRepository } from "@/repositories/in-memory/inMemoryRentalTransactionRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
// import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
// -------------- Error --------------
// import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
// import { SkinHasAlreadyBeenAnnounced } from "@/useCases/@errors/RentalTransaction/SkinHasAlreadyBeenAnnounced";
// -------------- Factories --------------
import { MakeCreatePerfilRepository } from "../@factories/Perfil/makeCreatePerfilRepository";
import { MakeCreateSkinRepository } from "../@factories/Skin/makeCreateSkinRepository";
import { InMemoryTransactionHistoryRepository } from "@/repositories/in-memory/inMemoryTransactionHistory";
import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";
import { skinsMock } from "@/Mock/skins";

let rentalTransactionRepository: InMemoryRentalTransactionRepository;
let transactionHistoryRepository: InMemoryTransactionHistoryRepository;
let skinRepository: InMemorySkinRepository;
let perfilRepository: InMemoryPerfilRepository;
let configurationRepository: InMemoryConfigurationRepository;
let walletRepository: InMemoryWalletRepository;
let notificationRepository: InMemoryNotificationRepository;
let makeCreateSkinRepository: MakeCreateSkinRepository;
let makeCreatePerfil: MakeCreatePerfilRepository;
let sut: CreateRentalTransactionUseCase;

describe("Rental Transaction Use Case", () => {
  beforeEach(async () => {
    rentalTransactionRepository = new InMemoryRentalTransactionRepository();
    skinRepository = new InMemorySkinRepository();
    perfilRepository = new InMemoryPerfilRepository();
    walletRepository = new InMemoryWalletRepository();
    configurationRepository = new InMemoryConfigurationRepository();
    notificationRepository = new InMemoryNotificationRepository();
    transactionHistoryRepository = new InMemoryTransactionHistoryRepository();
    makeCreateSkinRepository = new MakeCreateSkinRepository(skinRepository);
    makeCreatePerfil = new MakeCreatePerfilRepository(
      perfilRepository,
      configurationRepository
    );

    sut = new CreateRentalTransactionUseCase(
      rentalTransactionRepository,
      transactionHistoryRepository,
      skinRepository,
      perfilRepository,
      walletRepository,
      notificationRepository
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Deve ser capaz de criar uma Rental Transaction", async () => {
    await Promise.all([
      makeCreatePerfil.execute(
        "76561199205585878",
        "9DE77D4A568AE81B8975E54BFE1DC8C9"
      ),
      makeCreatePerfil.execute("76561199205585873"),
      makeCreateSkinRepository.execute({
        id: "124",
        skin_price: 200,
        asset_id: "32981477239",
        seller_id: "76561199205585878",
      }),
      walletRepository.create({
        owner_id: "76561199205585873",
        owner_name: "Comprador",
        value: 10000,
      }),
      walletRepository.create({
        owner_id: "76561199205585878",
        owner_name: "Vendedor",
        value: 10000,
      }),
    ]);

    const createRentalTransaction = await sut.execute({
      sellerId: "76561199205585878",
      buyerId: "76561199205585873",
      skins: [...skinsMock],
      daysQuantity: "10",
    });

    expect(createRentalTransaction.id).toEqual(expect.any(String));
    expect(createRentalTransaction.skins.length).toBeGreaterThan(0);
  });
});
