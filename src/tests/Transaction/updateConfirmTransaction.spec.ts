import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryTransactionRepository } from "@/repositories/in-memory/inMemoryTransactionRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { expect, describe, beforeEach, it } from "vitest";
import { MockFunctions } from "../utils/mockFunctions";
import { UpdateConfirmTransactionUseCase } from "@/useCases/Transaction/updateConfirmTransactionUseCase";
import { TransactionNotExistError } from "@/useCases/@errors/Transaction/TransactionNotExistError";
import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { NotUpdateTransaction } from "@/useCases/@errors/Transaction/NotUpdateTransaction";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";

let transactionRepository: InMemoryTransactionRepository;
let perfilRepository: InMemoryPerfilRepository;
let skinRepository: InMemorySkinRepository;
let walletRepository: InMemoryWalletRepository;
let notificationsRepository: InMemoryNotificationRepository;
let configurationRepository: InMemoryConfigurationRepository;
let mockFunction: MockFunctions;
let sut: UpdateConfirmTransactionUseCase;

describe("Update transaction Use Case", () => {
  beforeEach(async () => {
    transactionRepository = new InMemoryTransactionRepository();
    perfilRepository = new InMemoryPerfilRepository();
    skinRepository = new InMemorySkinRepository();
    walletRepository = new InMemoryWalletRepository();
    notificationsRepository = new InMemoryNotificationRepository();
    configurationRepository = new InMemoryConfigurationRepository();
    mockFunction = new MockFunctions(
      skinRepository,
      perfilRepository,
      configurationRepository
    );

    sut = new UpdateConfirmTransactionUseCase(
      transactionRepository,
      perfilRepository,
      walletRepository,
      notificationsRepository,
      skinRepository,
      configurationRepository
    );
  });

  it("Deve ser capaz de fazer um update", async () => {
    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      walletRepository.create({
        owner_name: "Italo",
        owner_id: "76561199205585878",
      }),

      walletRepository.create({
        owner_name: "Araujo",
        owner_id: "76561198195920183",
        value: 5000,
      }),
    ]);

    const createTransaction = await transactionRepository.create({
      skin_id: skin.id,
      seller_id: "76561199205585878",
      buyer_id: "76561198195920183",
      balance: skin.skin_price,
    });

    await Promise.all([
      sut.execute(createTransaction.id, "Aceito", "seller"),
      sut.execute(createTransaction.id, "Aceito", "buyer"),
    ]);

    const find = await transactionRepository.findById(createTransaction.id);

    expect(find.seller_confirm).toEqual("Aceito");
    expect(find.buyer_confirm).toEqual("Aceito");
    expect(find.status).toEqual("Concluído");
  });

  it("Deve concluir a transação quando o comprador aceitar", async () => {
    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
      walletRepository.create({
        owner_name: "Italo",
        owner_id: "76561199205585878",
      }),

      walletRepository.create({
        owner_name: "Araujo",
        owner_id: "76561198195920183",
        value: 5000,
      }),
    ]);

    const createTransaction = await transactionRepository.create({
      skin_id: skin.id,
      seller_id: "76561199205585878",
      buyer_id: "76561198195920183",
      balance: skin.skin_price,
    });
    await sut.execute(createTransaction.id, "Aceito", "buyer");

    const find = await transactionRepository.findById(createTransaction.id);

    expect(find.status).toEqual("Concluído");
  });

  it("Deve falhar a transação quando o comprador recusar", async () => {
    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
      walletRepository.create({
        owner_name: "Italo",
        owner_id: "76561199205585878",
      }),

      walletRepository.create({
        owner_name: "Araujo",
        owner_id: "76561198195920183",
        value: 5000,
      }),
    ]);

    const createTransaction = await transactionRepository.create({
      skin_id: skin.id,
      seller_id: "76561199205585878",
      buyer_id: "76561198195920183",
      balance: skin.skin_price,
    });
    await sut.execute(createTransaction.id, "Recusado", "buyer");
    const find = await transactionRepository.findById(createTransaction.id);

    expect(find.status).toEqual("Falhou");
  });

  it("Deve adicionar o saldo ao vendedor e notificar quando a transação for concluída", async () => {
    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
      walletRepository.create({
        owner_name: "Italo",
        owner_id: "76561199205585878",
        value: 0,
      }),

      walletRepository.create({
        owner_name: "Araujo",
        owner_id: "76561198195920183",
        value: 5000,
      }),
    ]);

    const createTransaction = await transactionRepository.create({
      skin_id: skin.id,
      seller_id: "76561199205585878",
      buyer_id: "76561198195920183",
      balance: skin.skin_price,
    });

    await sut.execute(createTransaction.id, "Aceito", "buyer");
    const findWallet = await walletRepository.findByUser("76561199205585878");
    const findNotification = notificationsRepository.notifications;
    expect(findWallet.value).toEqual(480);
    expect(findNotification.length).toEqual(2);
  });

  it("Deve devolver o dinheiro ao comprador e notificar em caso de falha da transação", async () => {
    const [skin, comprador] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
      walletRepository.create({
        owner_name: "Araujo",
        owner_id: "76561198195920183",
        value: 5000,
      }),
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
      walletRepository.create({
        owner_name: "Italo",
        owner_id: "76561199205585878",
        value: 0,
      }),
    ]);

    const createTransaction = await transactionRepository.create({
      skin_id: skin.id,
      seller_id: "76561199205585878",
      buyer_id: "76561198195920183",
      balance: skin.skin_price,
    });

    await sut.execute(createTransaction.id, "Recusado", "buyer");
    const findWallet = await walletRepository.findByUser("76561198195920183");

    const expectedBalanceAfterFailure = comprador.value + skin.skin_price;
    const findNotification = notificationsRepository.notifications;

    expect(findWallet.value).toEqual(expectedBalanceAfterFailure);
    expect(findNotification.length).toEqual(2);
  });

  it("Deve lançar um erro de transação inválida", async () => {
    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
    ]);

    await transactionRepository.create({
      skin_id: skin.id,
      seller_id: "76561199205585878",
      buyer_id: "76561198195920183",
      balance: skin.skin_price,
    });

    expect(() =>
      sut.execute("ID Invalido", "Recusado", "buyer")
    ).rejects.toBeInstanceOf(TransactionNotExistError);
  });

  it("Deve lançar um erro de perfil não existe", async () => {
    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
    ]);

    const createTransaction = await transactionRepository.create({
      skin_id: skin.id,
      seller_id: "76561199205585878",
      buyer_id: "76561198195920183",
      balance: skin.skin_price,
    });
    await sut.execute(createTransaction.id, "Recusado", "buyer");

    expect(() =>
      sut.execute(createTransaction.id, "Recusado", "seller")
    ).rejects.toBeInstanceOf(PerfilNotExistError);
  });

  it("Deve lançar um erro de atualização", async () => {
    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
    ]);

    const createTransaction = await transactionRepository.create({
      skin_id: skin.id,
      seller_id: "76561199205585878",
      buyer_id: "76561198195920183",
      balance: skin.skin_price,
    });

    await sut.execute(createTransaction.id, "Aceito", "buyer");

    await expect(() =>
      sut.execute(createTransaction.id, "Aceito", "buyer")
    ).rejects.toBeInstanceOf(NotUpdateTransaction);
  });

  it("Deve aumentar o total_exchanges em 1 ao criar uma transaction com sucesso", async () => {
    const [skin] = await Promise.all([
      mockFunction.createSampleSkin("76561199205585878"),
      mockFunction.createSampleProfile("76561199205585878", "Italo araújo"),
      mockFunction.createSampleProfile("76561198195920183", "Araujo"),
      walletRepository.create({
        owner_name: "Araujo",
        owner_id: "76561198195920183",
        value: 5000,
      }),
      walletRepository.create({
        owner_name: "Italo",
        owner_id: "76561199205585878",
        value: 0,
      }),
    ]);

    const transaction = await transactionRepository.create({
      skin_id: skin.id,
      seller_id: "76561199205585878",
      buyer_id: "76561198195920183",
      balance: skin.skin_price,
    });

    await sut.execute(transaction.id, "Aceito", "buyer");

    const findUser = await perfilRepository.findByUser("76561199205585878");
    expect(findUser.total_exchanges_completed).toBe(1);
  });
});
