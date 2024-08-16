import { expect, describe, it, beforeEach, vi } from "vitest";
// import nock from "nock";
// -------------- InMemory --------------
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
// -------------- Error --------------
import { MakeCreateSkinRepository } from "../@factories/Skin/makeCreateSkinRepository";
import { MakeCreatePerfilRepository } from "../@factories/Perfil/makeCreatePerfilRepository";
// -------------- Utils --------------
import { afterEach } from "node:test";
import { CronJobProcessRental } from "@/utils/CronJobProcessRental";
import { InMemoryRentalTransactionRepository } from "@/repositories/in-memory/inMemoryRentalTransactionRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";

let rentalTransaction: InMemoryRentalTransactionRepository;
let perfilRepository: InMemoryPerfilRepository;
let walletRepository: InMemoryWalletRepository;
let notificationRepository: InMemoryNotificationRepository;
let skinRepository: InMemorySkinRepository;
let configurationRepository: InMemoryConfigurationRepository;
let makeCreateSkin: MakeCreateSkinRepository;
let makeCreatePerfilRepository: MakeCreatePerfilRepository;
let sut: CronJobProcessRental;

describe("CronJobProcessRental Use Case", () => {
  beforeEach(async () => {
    rentalTransaction = new InMemoryRentalTransactionRepository();
    perfilRepository = new InMemoryPerfilRepository();
    skinRepository = new InMemorySkinRepository();
    notificationRepository = new InMemoryNotificationRepository();
    walletRepository = new InMemoryWalletRepository();
    configurationRepository = new InMemoryConfigurationRepository();
    makeCreateSkin = new MakeCreateSkinRepository(skinRepository);
    makeCreatePerfilRepository = new MakeCreatePerfilRepository(
      perfilRepository,
      configurationRepository
    );

    sut = new CronJobProcessRental(
      rentalTransaction,
      walletRepository,
      notificationRepository,
      skinRepository
    );

    afterEach(() => {
      vi.useRealTimers();
    });
  });

  it("Deve ser capaz de cancelar uma transação se passar de 20 min", async () => {
    const buyerId: string = "76561198862407248";
    const sellerId: string = "76561198015724229";

    const guaranteeSkin = {
      id: "skin-001",
      owner_id: sellerId,
      asset_id: "asset-001",
      skin_name: "AWP | Dragon Lore",
      skin_color: "8650AC",
      skin_wear: "FN",
      skin_image: "http://example.com/dragon_lore.png",
      skin_weapon: "AWP",
      skin_float: "0.01",
      skin_paintseed: 45,
      skin_rarity: "Covert",
      skin_stickers: [],
      skin_link_game: "http://example.com/dragon_lore_game",
      skin_link_steam: "http://example.com/dragon_lore_steam",
    };

    await Promise.all([
      makeCreatePerfilRepository.execute(sellerId),
      makeCreatePerfilRepository.execute(buyerId),
      walletRepository.create({
        owner_id: buyerId,
        owner_name: "Comprador",
        value: 1000,
      }),
    ]);

    const [skin1, skin2] = await Promise.all([
      makeCreateSkin.execute(sellerId, sellerId),
      makeCreateSkin.execute(sellerId, buyerId),
    ]);

    const transactions = [
      {
        buyerId,
        daysQuantity: 10,
        totalPriceRent: 100,
        skinsRent: [skin1],
        skinsGuarantee: guaranteeSkin as any,
        createdAt: new Date(
          new Date().setMinutes(new Date().getMinutes() - 50)
        ),
      },
      {
        buyerId,
        daysQuantity: 10,
        totalPriceRent: 200,
        skinsRent: [skin2],
        skinsGuarantee: guaranteeSkin as any,
        createdAt: new Date(
          new Date().setMinutes(new Date().getMinutes() - 50)
        ),
      },
    ];

    await Promise.all(transactions.map((tx) => rentalTransaction.create(tx)));

    await sut.execute();

    rentalTransaction.rentalTransactions.forEach((transaction) => {
      expect(transaction.status).toEqual("Failed");
    });

    expect(notificationRepository.notifications.length).toBeGreaterThan(1);
    expect(skinRepository.skins[0].status).toBeNull();
  });

  it("Deve enviar notificações quando o prazo de aluguel estiver prestes a expirar", async () => {
    const buyerId: string = "76561198862407248";
    const sellerId: string = "76561198015724229";

    const guaranteeSkin = {
      id: "skin-001",
      owner_id: sellerId,
      asset_id: "asset-001",
      skin_name: "AWP | Dragon Lore",
      skin_color: "8650AC",
      skin_wear: "FN",
      skin_image: "http://example.com/dragon_lore.png",
      skin_weapon: "AWP",
      skin_float: "0.01",
      skin_paintseed: 45,
      skin_rarity: "Covert",
      skin_stickers: [],
      skin_link_game: "http://example.com/dragon_lore_game",
      skin_link_steam: "http://example.com/dragon_lore_steam",
    };

    await Promise.all([
      makeCreatePerfilRepository.execute(sellerId),
      makeCreatePerfilRepository.execute(buyerId),
      walletRepository.create({
        owner_id: buyerId,
        owner_name: "Comprador",
        value: 1000,
      }),
    ]);

    const [skin1] = await Promise.all([
      makeCreateSkin.execute(sellerId, sellerId),
    ]);

    const transaction = {
      buyerId,
      daysQuantity: 10,
      totalPriceRent: 100,
      skinsRent: [skin1],
      skinsGuarantee: guaranteeSkin as any,
      endDate: new Date(new Date().getTime() + 11 * 60 * 60 * 1000), // Faltam 11 horas para expirar
      status: "TrialPeriodStarted",
    };

    await rentalTransaction.create(transaction as any);
    await sut.execute();

    const transactionsRental = rentalTransaction.rentalTransactions;
    console.log(transactionsRental);

    expect(transactionsRental[0]?.deadlineNotified).toBe(true);
    expect(notificationRepository.notifications.length).toBe(1);
    expect(notificationRepository.notifications[0].owner_id).toBe(buyerId);
    expect(notificationRepository.notifications[0].description).toBe(
      "Seu período de aluguel está prestes a terminar. Por favor, devolva a skin."
    );
  });
});
