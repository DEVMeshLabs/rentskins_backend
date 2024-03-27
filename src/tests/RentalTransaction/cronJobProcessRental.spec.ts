import { expect, describe, beforeEach, it, vi } from "vitest";
import nock from "nock";
import inventorySeller from "../fixures/getItemHistoricReceived.json";
// -------------- InMemory --------------
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
// -------------- Error --------------
import { MakeCreateSkinRepository } from "../@factories/Skin/makeCreateSkinRepository";
import { MakeCreatePerfilRepository } from "../@factories/Perfil/makeCreatePerfilRepository";
import { InMemoryTransactionHistoryRepository } from "@/repositories/in-memory/inMemoryTransactionHistory";
import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";
// -------------- Utils --------------
import { env } from "@/env";
import { afterEach } from "node:test";
import { addHours } from "@/utils/compareDates";
import { CronJobProcessRental } from "@/utils/CronJobProcessRental";
import { InMemoryRentalTransactionRepository } from "@/repositories/in-memory/inMemoryRentalTransactionRepository";

let rentalTransaction: InMemoryRentalTransactionRepository;
let transactionHistoryRepository: InMemoryTransactionHistoryRepository;
let perfilRepository: InMemoryPerfilRepository;
let skinRepository: InMemorySkinRepository;
let walletRepository: InMemoryWalletRepository;
let configurationRepository: InMemoryConfigurationRepository;
let notificationRepository: InMemoryNotificationRepository;
let makeCreateSkin: MakeCreateSkinRepository;
let makeCreatePerfilRepository: MakeCreatePerfilRepository;
let sut: CronJobProcessRental;

describe("CronJobProcessRental Use Case", () => {
  beforeEach(async () => {
    transactionHistoryRepository = new InMemoryTransactionHistoryRepository();
    rentalTransaction = new InMemoryRentalTransactionRepository();
    perfilRepository = new InMemoryPerfilRepository();
    skinRepository = new InMemorySkinRepository();
    walletRepository = new InMemoryWalletRepository();
    configurationRepository = new InMemoryConfigurationRepository();
    notificationRepository = new InMemoryNotificationRepository();
    makeCreateSkin = new MakeCreateSkinRepository(skinRepository);
    makeCreatePerfilRepository = new MakeCreatePerfilRepository(
      perfilRepository,
      configurationRepository
    );

    sut = new CronJobProcessRental(
      transactionHistoryRepository,
      rentalTransaction,
      configurationRepository,
      notificationRepository,
      walletRepository,
      perfilRepository,
      skinRepository
    );

    afterEach(() => {
      vi.useRealTimers();
    });
  });

  it("Deve ser capaz de criar uma Transaction de aluguel", async () => {
    vi.useFakeTimers();

    const [skin] = await Promise.all([
      makeCreateSkin.execute({
        seller_id: "76561198862407248",
        asset_id: "32981477239",
      }),
      makeCreatePerfilRepository.execute(
        "76561198862407248",
        "DBBF677F1392F52023DC909D966F7516"
      ),
      makeCreatePerfilRepository.execute("76561198015724229"),
    ]);

    const vendedor = await walletRepository.create({
      owner_name: "Italo",
      owner_id: "76561198862407248",
      value: 0,
    });

    const comprador = await walletRepository.create({
      owner_name: "Araujo",
      owner_id: "76561198015724229",
      value: 5000,
    });

    const createTransaction = await rentalTransaction.create({
      skin_id: skin.id,
      seller_id: vendedor.owner_id,
      buyer_id: comprador.owner_id,
      days_quantity: "7",
      remainder: 50,
      total_price: 500,
      fee_total_price: 450,
    });

    const newDate = addHours(
      24 * (Number(createTransaction.days_quantity) + 1)
    );
    console.log(newDate);
    const createdTransactionHistory = await transactionHistoryRepository.create(
      {
        buyer_id: comprador.owner_id,
        seller_id: vendedor.owner_id,
        transaction_id: createTransaction.id,
        asset_id: skin.asset_id,
        dateProcess: newDate,
      }
    );

    const scope = nock("https:www.steamwebapi.com")
      .post("/steam/api/trade/status")
      .query({
        key: env.KEY_STEAM_WEB_API,
      })
      .reply(200, inventorySeller);

    vi.setSystemTime(newDate);

    await sut.execute();

    expect(createdTransactionHistory.id).toEqual(expect.any(String));
    expect(walletRepository.wallet[1].value).toBe(5450);
    expect(walletRepository.wallet[0].value).toBe(50);
    scope.done();
  });
});
