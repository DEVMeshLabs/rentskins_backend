import { expect, describe, beforeEach, it } from "vitest";
// -------------- InMemory --------------
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryTransactionRepository } from "@/repositories/in-memory/inMemoryTransactionRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
// -------------- Error --------------
// -------------- Error --------------
import { MakeCreateSkinRepository } from "../@factories/Skin/makeCreateSkinRepository";
import { MakeCreatePerfilRepository } from "../@factories/Perfil/makeCreatePerfilRepository";
import { InMemoryTransactionHistoryRepository } from "@/repositories/in-memory/inMemoryTransactionHistory";
import { CreateTransactionHistoryUseCase } from "@/useCases/TransactionHistory/createTransactionHistoryUseCase";

let transactionRepository: InMemoryTransactionRepository;
let transactionHistoryRepository: InMemoryTransactionHistoryRepository;
let perfilRepository: InMemoryPerfilRepository;
let skinRepository: InMemorySkinRepository;
let walletRepository: InMemoryWalletRepository;
let configurationRepository: InMemoryConfigurationRepository;
let makeCreateSkin: MakeCreateSkinRepository;
let makeCreatePerfilRepository: MakeCreatePerfilRepository;
let sut: CreateTransactionHistoryUseCase;

describe("Transaction Use Case", () => {
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

    sut = new CreateTransactionHistoryUseCase(
      transactionHistoryRepository,
      transactionRepository
    );
  });

  it("Deve ser capaz de criar uma transação", async () => {
    const [skin] = await Promise.all([
      makeCreateSkin.execute({
        seller_id: "76561199205585878",
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

    const createTransaction = await transactionRepository.create({
      skin_id: skin.id,
      seller_id: vendedor.owner_id,
      buyer_id: comprador.owner_id,
      balance: 500,
    });

    const createdTransactionHistory = await sut.execute({
      buyer_id: comprador.owner_id,
      seller_id: vendedor.owner_id,
      transaction_id: createTransaction.id,
    });

    console.log(createdTransactionHistory);
    expect(createdTransactionHistory.id).toEqual(expect.any(String));
  });
});
