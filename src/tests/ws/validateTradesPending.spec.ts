import { describe, beforeEach, it, vi, expect } from "vitest";
import fs from "fs";
// -------------- InMemory --------------
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryTransactionRepository } from "@/repositories/in-memory/inMemoryTransactionRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { MakeCreateSkinRepository } from "../@factories/Skin/makeCreateSkinRepository";
import { MakeCreatePerfilRepository } from "../@factories/Perfil/makeCreatePerfilRepository";
import { afterEach } from "node:test";
// import { addHours } from "@/utils/compareDates";
import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { InMemoryTransactionHistoryRepository } from "@/repositories/in-memory/inMemoryTransactionHistory";
import { addMinutes } from "@/utils/compareDates";
import { ValidateTradesPending } from "@/useCases/ws/validateTradesPending";

let transactionRepository: InMemoryTransactionRepository;
let transactionHistoryRepository: ITransactionHistoryRepository;
let perfilRepository: InMemoryPerfilRepository;
let skinRepository: InMemorySkinRepository;
let walletRepository: InMemoryWalletRepository;
let configurationRepository: InMemoryConfigurationRepository;
let makeCreateSkin: MakeCreateSkinRepository;
let makeCreatePerfilRepository: MakeCreatePerfilRepository;
let sut: ValidateTradesPending;

describe("CronJobProcessTransaction Use Case", () => {
  beforeEach(async () => {
    transactionRepository = new InMemoryTransactionRepository();
    transactionHistoryRepository = new InMemoryTransactionHistoryRepository();
    perfilRepository = new InMemoryPerfilRepository();
    skinRepository = new InMemorySkinRepository();
    walletRepository = new InMemoryWalletRepository();
    configurationRepository = new InMemoryConfigurationRepository();
    makeCreateSkin = new MakeCreateSkinRepository(skinRepository);
    makeCreatePerfilRepository = new MakeCreatePerfilRepository(
      perfilRepository,
      configurationRepository
    );

    sut = new ValidateTradesPending(transactionRepository, skinRepository);

    afterEach(() => {
      vi.useRealTimers();
    });
  });

  it("should validate trades pending", async () => {
    const mockData = JSON.parse(
      fs.readFileSync("src/tests/fixures/getPendingTrades.json", "utf-8")
    );
    const [skin] = await Promise.all([
      makeCreateSkin.execute({
        skin_name: "Sawed-Off | Snake Camo (Well-Worn)",
        skin_market_hash_name: "Sawed-Off | Snake Camo (Well-Worn)",
        seller_id: "76561198862407248",
        asset_id: "34957127940",
        skin_classid: "310777155",
        skin_instanceid: "1363818010",
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

    await transactionHistoryRepository.create({
      buyer_id: comprador.owner_id,
      seller_id: vendedor.owner_id,
      transaction_id: createTransaction.id,
      asset_id: skin.asset_id,
      dateProcess: addMinutes(10),
      processTransaction: "Pending",
    });
    await sut.execute(createTransaction.id, mockData);

    expect(transactionRepository.transactions[0].status).toBe(
      "NegotiationSend"
    );
  });

  // it("should not validate trades pending when the status is not 'NegotiationSend' aaaaaa", async () => {
  //   const mockData = JSON.parse(
  //     fs.readFileSync("src/tests/fixures/getPendingTrades.json", "utf-8")
  //   );
  //   const [skin] = await Promise.all([
  //     makeCreateSkin.execute({
  //       skin_name: "Sawed-Off | Snake Camo (Well-Worn)",
  //       skin_market_hash_name: "Sawed-Off | Snake Camo (Well-Worn)",
  //       seller_id: "76561198862407248",
  //       asset_id: "34957127940",
  //       skin_classid: "310777155",
  //       skin_instanceid: "1363818010",
  //     }),
  //     makeCreatePerfilRepository.execute(
  //       "76561198015724229",
  //       "DBBF677F1392F52023DC909D966F7516"
  //     ),
  //     makeCreatePerfilRepository.execute("76561198086816961"),
  //   ]);
  //   const vendedor = await walletRepository.create({
  //     owner_name: "Italo",
  //     owner_id: "76561198862407248",
  //     value: 0,
  //   });

  //   const comprador = await walletRepository.create({
  //     owner_name: "Araujo",
  //     owner_id: "76561198086816961",
  //     value: 5000,
  //   });

  //   const createTransaction = await transactionRepository.create({
  //     skin_id: skin.id,
  //     seller_id: vendedor.owner_id,
  //     buyer_id: comprador.owner_id,
  //     balance: 500,
  //   });

  //   await transactionHistoryRepository.create({
  //     buyer_id: comprador.owner_id,
  //     seller_id: vendedor.owner_id,
  //     transaction_id: createTransaction.id,
  //     asset_id: skin.asset_id,
  //     dateProcess: addMinutes(10),
  //     processTransaction: "Pending",
  //   });
  //   await sut.execute(createTransaction.id, mockData);

  //   expect(transactionRepository.transactions[0].status).not.toBe(
  //     "NegotiationSend"
  //   );
  // });
});
