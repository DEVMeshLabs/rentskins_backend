import { expect, describe, beforeEach, it, vi } from "vitest";
import fs from "fs";
// -------------- InMemory --------------
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryTransactionRepository } from "@/repositories/in-memory/inMemoryTransactionRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { MakeCreateSkinRepository } from "../@factories/Skin/makeCreateSkinRepository";
import { MakeCreatePerfilRepository } from "../@factories/Perfil/makeCreatePerfilRepository";
import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";
import { formatBalance } from "@/utils/formatBalance";
import { afterEach } from "node:test";
// import { addHours } from "@/utils/compareDates";
import { ValidateTransactionHistoryUseCase } from "@/useCases/ws/validateTransactionHistoryUseCase";
import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { InMemoryTransactionHistoryRepository } from "@/repositories/in-memory/inMemoryTransactionHistory";
import { addMinutes } from "@/utils/compareDates";

let transactionRepository: InMemoryTransactionRepository;
let transactionHistoryRepository: ITransactionHistoryRepository;
let perfilRepository: InMemoryPerfilRepository;
let skinRepository: InMemorySkinRepository;
let walletRepository: InMemoryWalletRepository;
let configurationRepository: InMemoryConfigurationRepository;
let notificationRepository: InMemoryNotificationRepository;
let makeCreateSkin: MakeCreateSkinRepository;
let makeCreatePerfilRepository: MakeCreatePerfilRepository;
let sut: ValidateTransactionHistoryUseCase;

describe("CronJobProcessTransaction Use Case", () => {
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

    sut = new ValidateTransactionHistoryUseCase(
      transactionHistoryRepository,
      transactionRepository,
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

  it("Deve ser capaz de criar notificações, pagar valor, aumentar o total de transações completas", async () => {
    const mockData = JSON.parse(
      fs.readFileSync("src/tests/fixures/getTradeHistorySucess.json", "utf-8")
    );

    const [skin] = await Promise.all([
      makeCreateSkin.execute({
        seller_id: "76561198862407248",
        asset_id: "36352899007",
        skin_market_hash_name: "Sticker | FURIA | Paris 2023",
        skin_instanceid: "188530139",
      }),
      makeCreatePerfilRepository.execute(
        "76561198862407248",
        "DBBF677F1392F52023DC909D966F7516"
      ),
      makeCreatePerfilRepository.execute("76561198086816961"),
    ]);

    const vendedor = await walletRepository.create({
      owner_name: "Italo",
      owner_id: "76561198862407248",
      value: 0,
    });

    const comprador = await walletRepository.create({
      owner_name: "Araujo",
      owner_id: "76561198086816961",
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
        dateProcess: addMinutes(10),
        processTransaction: "Pending",
      }
    );

    await sut.execute(createdTransactionHistory.transaction_id, mockData);
    const notifications = notificationRepository.notifications;
    const { porcentagem } = formatBalance(skin.skin_price);
    expect(createdTransactionHistory.id).toEqual(expect.any(String));
    expect(perfilRepository.perfil[0].total_exchanges_completed).toBe(1);
    expect(walletRepository.wallet[0].value).toBe(porcentagem);
    expect(notifications[0].owner_id).toBe("76561198862407248");
    expect(notifications[1].owner_id).toBe("76561198086816961");
    expect(transactionRepository.transactions[0].status).toBe(
      "NegociationAccepted"
    );
  });

  // it("Teste de erro na execução com ValidateTransactionHistoryError", async () => {
  //   const mockData = JSON.parse(
  //     fs.readFileSync("src/tests/fixures/getTradeHistorySucess.json", "utf-8")
  //   );

  //   const [skin] = await Promise.all([
  //     makeCreateSkin.execute({
  //       seller_id: "76561198015724229",
  //       asset_id: "329584152",
  //     }),
  //     makeCreatePerfilRepository.execute(
  //       "76561198015724229",
  //       "DBBF677F1392F52023DC909D966F7516"
  //     ),
  //     makeCreatePerfilRepository.execute("76561198862407248"),
  //   ]);

  //   const vendedor = await walletRepository.create({
  //     owner_name: "Italo",
  //     owner_id: "76561198015724229",
  //     value: 0,
  //   });

  //   const comprador = await walletRepository.create({
  //     owner_name: "Araujo",
  //     owner_id: "76561198862407248",
  //     value: 5000,
  //   });

  //   const createTransaction = await transactionRepository.create({
  //     skin_id: skin.id,
  //     seller_id: vendedor.owner_id,
  //     buyer_id: comprador.owner_id,
  //     balance: 500,
  //   });

  //   const createdTransactionHistory = await transactionHistoryRepository.create(
  //     {
  //       buyer_id: comprador.owner_id,
  //       seller_id: vendedor.owner_id,
  //       transaction_id: createTransaction.id,
  //       asset_id: skin.asset_id,
  //       dateProcess: addMinutes(10),
  //       processTransaction: "Pending",
  //     }
  //   );
  //   const notifications = notificationRepository.notifications;

  //   await expect(() =>
  //     sut.execute(createdTransactionHistory.transaction_id, mockData)
  //   ).rejects.toBeInstanceOf(ValidateTransactionHistoryError);
  //   expect(notifications.length).toBe(0);
  //   expect(transactionRepository.transactions[0].status).not.toBe(
  //     "NegociationAccepted"
  //   );
  // });

  // it("Teste de erro na execução generico", async () => {
  //   const mockData = JSON.parse(
  //     fs.readFileSync("src/tests/fixures/getSendTradeOffer.json", "utf-8")
  //   );

  //   const [skin] = await Promise.all([
  //     makeCreateSkin.execute({
  //       seller_id: "76561198015724229",
  //       asset_id: "329584152",
  //     }),
  //     makeCreatePerfilRepository.execute(
  //       "76561198015724229",
  //       "DBBF677F1392F52023DC909D966F7516"
  //     ),
  //     makeCreatePerfilRepository.execute("76561198862407248"),
  //   ]);

  //   const vendedor = await walletRepository.create({
  //     owner_name: "Italo",
  //     owner_id: "76561198015724229",
  //     value: 0,
  //   });

  //   const comprador = await walletRepository.create({
  //     owner_name: "Araujo",
  //     owner_id: "76561198862407248",
  //     value: 5000,
  //   });

  //   const createTransaction = await transactionRepository.create({
  //     skin_id: skin.id,
  //     seller_id: vendedor.owner_id,
  //     buyer_id: comprador.owner_id,
  //     balance: 500,
  //   });

  //   const createdTransactionHistory = await transactionHistoryRepository.create(
  //     {
  //       buyer_id: comprador.owner_id,
  //       seller_id: vendedor.owner_id,
  //       transaction_id: createTransaction.id,
  //       asset_id: skin.asset_id,
  //       dateProcess: addMinutes(10),
  //       processTransaction: "Pending",
  //     }
  //   );
  //   const notifications = notificationRepository.notifications;

  //   await expect(() =>
  //     sut.execute(createdTransactionHistory.transaction_id, mockData)
  //   ).rejects.toBeInstanceOf(Error);
  //   expect(notifications.length).toBe(0);
  // });
});
