import { expect, describe, beforeEach, it, vi } from "vitest";
import nock from "nock";
import inventorySeller from "../fixures/mockInventory.json";
// -------------- InMemory --------------
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryTransactionRepository } from "@/repositories/in-memory/inMemoryTransactionRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
// -------------- Error --------------
import { MakeCreateSkinRepository } from "../@factories/Skin/makeCreateSkinRepository";
import { MakeCreatePerfilRepository } from "../@factories/Perfil/makeCreatePerfilRepository";
import { InMemoryTransactionHistoryRepository } from "@/repositories/in-memory/inMemoryTransactionHistory";
import { CronJobProcessTransaction } from "@/utils/CronJobProcessTransaction";
import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";
// -------------- Utils --------------
import { formatBalance } from "@/utils/formatBalance";
import { env } from "@/env";
import { afterEach } from "node:test";
import { addHours } from "@/utils/compareDates";

let transactionRepository: InMemoryTransactionRepository;
let transactionHistoryRepository: InMemoryTransactionHistoryRepository;
let perfilRepository: InMemoryPerfilRepository;
let skinRepository: InMemorySkinRepository;
let walletRepository: InMemoryWalletRepository;
let configurationRepository: InMemoryConfigurationRepository;
let notificationRepository: InMemoryNotificationRepository;
let makeCreateSkin: MakeCreateSkinRepository;
let makeCreatePerfilRepository: MakeCreatePerfilRepository;
let sut: CronJobProcessTransaction;

describe("CronJobProcess Use Case", () => {
  beforeEach(async () => {
    transactionRepository = new InMemoryTransactionRepository();
    transactionHistoryRepository = new InMemoryTransactionHistoryRepository();
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

    sut = new CronJobProcessTransaction(
      transactionHistoryRepository,
      transactionRepository,
      configurationRepository,
      notificationRepository,
      walletRepository,
      perfilRepository
    );

    afterEach(() => {
      vi.useRealTimers();
    });
  });

  it("Deve ser capaz de criar notificações, pagar valor, aumentar o total de transações completas", async () => {
    vi.useFakeTimers();

    const [skin] = await Promise.all([
      makeCreateSkin.execute({
        seller_id: "76561198015724229",
        asset_id: "35477944719",
      }),
      makeCreatePerfilRepository.execute(
        "76561198015724229",
        "15B121C41C8C8E7EE912E0A3EFB22C66"
      ),
      makeCreatePerfilRepository.execute("76561198862407248"),
    ]);

    const vendedor = await walletRepository.create({
      owner_name: "Italo",
      owner_id: "76561198015724229",
      value: 0,
    });

    const comprador = await walletRepository.create({
      owner_name: "Araujo",
      owner_id: "76561198862407248",
      value: 5000,
    });

    const createTransaction = await transactionRepository.create({
      skin_id: skin.id,
      seller_id: vendedor.owner_id,
      buyer_id: comprador.owner_id,
      balance: 500,
    });

    const createdTransactionHistory = await transactionHistoryRepository.create(
      {
        buyer_id: comprador.owner_id,
        seller_id: vendedor.owner_id,
        transaction_id: createTransaction.id,
        asset_id: skin.asset_id,
        dateProcess: addHours(),
      }
    );

    const scope = nock("https://www.steamwebapi.com")
      .post("/steam/api/trade/status")
      .query({
        key: env.KEY_STEAM_WEB_API,
      })
      .reply(200, inventorySeller);

    const date = addHours();

    vi.setSystemTime(date);

    await sut.execute();

    const notifications = notificationRepository.notifications;
    const { porcentagem } = formatBalance(skin.skin_price);

    expect(createdTransactionHistory.id).toEqual(expect.any(String));
    expect(
      transactionHistoryRepository.transactionsHistory[0].processTransaction
    ).toBe(true);
    expect(perfilRepository.perfil[0].total_exchanges_completed).toBe(1);
    expect(walletRepository.wallet[0].value).toBe(porcentagem);
    expect(notifications[0].owner_id).toBe("76561198015724229");
    expect(notifications[1].owner_id).toBe("76561198862407248");
    expect(transactionRepository.transactions[0].status).toBe("concluído");
    scope.done();
  });

  it("Deve ser capaz de criar notificações, retornar o valor para o comprador, aumentar o total de transações faileds", async () => {
    vi.useFakeTimers();
    const [skin] = await Promise.all([
      makeCreateSkin.execute({
        seller_id: "76561198015724229",
        asset_id: "35477944718",
      }),
      makeCreatePerfilRepository.execute(
        "76561198015724229",
        "15B121C41C8C8E7EE912E0A3EFB22C66"
      ),
      makeCreatePerfilRepository.execute("76561198862407248"),
    ]);

    const vendedor = await walletRepository.create({
      owner_name: "Italo",
      owner_id: "76561198015724229",
      value: 0,
    });

    const comprador = await walletRepository.create({
      owner_name: "Araujo",
      owner_id: "76561198862407248",
      value: 1000,
    });

    const createTransaction = await transactionRepository.create({
      skin_id: skin.id,
      seller_id: vendedor.owner_id,
      buyer_id: comprador.owner_id,
      balance: 500,
    });

    const createdTransactionHistory = await transactionHistoryRepository.create(
      {
        buyer_id: comprador.owner_id,
        seller_id: vendedor.owner_id,
        transaction_id: createTransaction.id,
        asset_id: skin.asset_id,
        dateProcess: addHours(),
      }
    );

    const scope = nock("https://www.steamwebapi.com")
      .post("/steam/api/trade/status")
      .query({
        key: env.KEY_STEAM_WEB_API,
      })
      .reply(404, []);

    const date = addHours();
    vi.setSystemTime(date);
    await sut.execute();

    const notifications = notificationRepository.notifications;

    expect(createdTransactionHistory.id).toEqual(expect.any(String));
    expect(
      transactionHistoryRepository.transactionsHistory[0].processTransaction
    ).toBe(true);
    expect(notifications[0].owner_id).toBe("76561198015724229");
    expect(notifications[1].owner_id).toBe("76561198862407248");
    expect(perfilRepository.perfil[0].total_exchanges_failed).toBe(1);
    expect(walletRepository.wallet[1].value).toBe(1500);
    expect(transactionRepository.transactions[0].status).toBe("Falhada");
    scope.done();
  });
});
