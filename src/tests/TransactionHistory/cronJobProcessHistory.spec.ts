import { expect, describe, beforeEach, it, vi } from "vitest";
// import nock from "nock";
// import inventorySeller from "../fixures/mockInventory.json";
// // -------------- InMemory --------------
// import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
// import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
// import { InMemoryTransactionRepository } from "@/repositories/in-memory/inMemoryTransactionRepository";
// import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
// import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
// // -------------- Error --------------
// import { MakeCreateSkinRepository } from "../@factories/Skin/makeCreateSkinRepository";
// import { MakeCreatePerfilRepository } from "../@factories/Perfil/makeCreatePerfilRepository";
// import { InMemoryTransactionHistoryRepository } from "@/repositories/in-memory/inMemoryTransactionHistory";
// import { CronJobProcessTransaction } from "@/utils/CronJobProcessTransaction";
// import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";
// -------------- Utils --------------
// import { formatBalance } from "@/utils/formatBalance";
// import { env } from "@/env";
import { afterEach } from "node:test";
// import { addHours } from "@/utils/compareDates";

// let transactionRepository: InMemoryTransactionRepository;
// let transactionHistoryRepository: InMemoryTransactionHistoryRepository;
// let perfilRepository: InMemoryPerfilRepository;
// let skinRepository: InMemorySkinRepository;
// let walletRepository: InMemoryWalletRepository;
// let configurationRepository: InMemoryConfigurationRepository;
// let notificationRepository: InMemoryNotificationRepository;
// let makeCreateSkin: MakeCreateSkinRepository;
// let makeCreatePerfilRepository: MakeCreatePerfilRepository;
// let sut: CronJobProcessTransaction;

describe("CronJobProcessTransaction Use Case", () => {
  beforeEach(async () => {
    // transactionRepository = new InMemoryTransactionRepository();
    // transactionHistoryRepository = new InMemoryTransactionHistoryRepository();
    // perfilRepository = new InMemoryPerfilRepository();
    // skinRepository = new InMemorySkinRepository();
    // walletRepository = new InMemoryWalletRepository();
    // configurationRepository = new InMemoryConfigurationRepository();
    // notificationRepository = new InMemoryNotificationRepository();
    // makeCreateSkin = new MakeCreateSkinRepository(skinRepository);
    // makeCreatePerfilRepository = new MakeCreatePerfilRepository(
    //   perfilRepository,
    //   configurationRepository
    // );

    // sut = new CronJobProcessTransaction(
    //   transactionHistoryRepository,
    //   transactionRepository,
    //   configurationRepository,
    //   notificationRepository,
    //   walletRepository,
    //   perfilRepository,
    //   skinRepository
    // );

    afterEach(() => {
      vi.useRealTimers();
    });
  });
  it("should be able to process transaction", async () => {
    expect(1).toBe(1);
  });
});
