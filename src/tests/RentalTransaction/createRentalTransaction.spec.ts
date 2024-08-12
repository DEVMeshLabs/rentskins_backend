import { expect, describe, beforeEach, it, vi, afterEach } from "vitest";
import { CreateTransactionRentalUseCase } from "@/useCases/TransactionRental/createTransactionRentalUseCase";
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

let rentalTransactionRepository: InMemoryRentalTransactionRepository;
let transactionHistoryRepository: InMemoryTransactionHistoryRepository;
let skinRepository: InMemorySkinRepository;
let perfilRepository: InMemoryPerfilRepository;
let configurationRepository: InMemoryConfigurationRepository;
let walletRepository: InMemoryWalletRepository;
let notificationRepository: InMemoryNotificationRepository;
let makeCreateSkinRepository: MakeCreateSkinRepository;
let makeCreatePerfil: MakeCreatePerfilRepository;
let sut: CreateTransactionRentalUseCase;

describe("Rental Transaction Use Case", () => {
  const SELLER_ID = "76561199205585878";
  const BUYER_ID = "76561199205585873";
  const INITIAL_WALLET_VALUE = 10000;
  const RENTAL_DAYS = "10";
  const TOTAL_RENTAL_PRICE = 180;

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

    sut = new CreateTransactionRentalUseCase(
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
    const [, , skin] = await Promise.all([
      makeCreatePerfil.execute(SELLER_ID, "9DE77D4A568AE81B8975E54BFE1DC8C9"),
      makeCreatePerfil.execute(BUYER_ID),
      makeCreateSkinRepository.execute(),
      walletRepository.create({
        owner_id: BUYER_ID,
        owner_name: "Comprador",
        value: INITIAL_WALLET_VALUE,
      }),
      walletRepository.create({
        owner_id: SELLER_ID,
        owner_name: "Vendedor",
        value: INITIAL_WALLET_VALUE,
      }),
    ]);

    const createRentalTransaction = await sut.execute({
      buyerId: BUYER_ID,
      skinsRent: [skin] as any,
      skinsGuarantee: [] as any,
      daysQuantity: Number(RENTAL_DAYS),
      totalPriceRent: TOTAL_RENTAL_PRICE,
      totalPriceSkins: 0,
      fee: 0,
    });
    console.log(createRentalTransaction);
    expect(createRentalTransaction.id).toEqual(expect.any(String));
    // expect(createRentalTransaction.skinsRent.length).toBeGreaterThan(0);
  });

  // it("Deve ser capaz de subtrair o saldo da carteira do comprador", async () => {
  //   const [walletComprador, , , , skin] = await Promise.all([
  //     walletRepository.create({
  //       owner_id: BUYER_ID,
  //       owner_name: "Comprador",
  //       value: 10000,
  //     }),
  //     walletRepository.create({
  //       owner_id: SELLER_ID,
  //       owner_name: "Vendedor",
  //       value: 10000,
  //     }),
  //     makeCreatePerfil.execute(BUYER_ID),
  //     makeCreatePerfil.execute(SELLER_ID, "9DE77D4A568AE81B8975E54BFE1DC8C9"),
  //     makeCreateSkinRepository.execute(skinsMock[0]),
  //   ]);

  //   const rentalTransaction = await sut.execute({
  //     buyerId: BUYER_ID,
  //     skinsRent: [skin] as any,
  //     skinsGuarantee: [],
  //     daysQuantity: RENTAL_DAYS,
  //     totalPriceRent: TOTAL_RENTAL_PRICE,
  //     totalGuarantee: 0,
  //   });
  //   console.log("Rental: ", rentalTransaction);
  //   // expect(walletRepository.wallet[0].value).toBe(
  //   //   walletComprador.value - rentalTransaction.totalPriceRent
  //   // );
  // });
});
