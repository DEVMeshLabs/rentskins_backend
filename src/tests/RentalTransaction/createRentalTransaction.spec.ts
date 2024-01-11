import { expect, describe, beforeEach, it, vi } from "vitest";
import { CreateRentalTransactionUseCase } from "@/useCases/RentalTransaction/createRentalTransactionUseCase";
// -------------- InMemory --------------
import { InMemoryRentalTransactionRepository } from "@/repositories/in-memory/inMemoryRentalTransactionRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryConfigurationRepository } from "@/repositories/in-memory/inMemoryConfigurationRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
// -------------- Error --------------
import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { SkinHasAlreadyBeenAnnounced } from "@/useCases/@errors/RentalTransaction/SkinHasAlreadyBeenAnnounced";
// -------------- Factories --------------
import { MakeCreatePerfilRepository } from "../@factories/Perfil/makeCreatePerfilRepository";
import { MakeCreateSkinRepository } from "../@factories/Skin/makeCreateSkinRepository";

let rentalTransactionRepository: InMemoryRentalTransactionRepository;
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

    makeCreateSkinRepository = new MakeCreateSkinRepository(skinRepository);
    makeCreatePerfil = new MakeCreatePerfilRepository(
      perfilRepository,
      configurationRepository
    );

    sut = new CreateRentalTransactionUseCase(
      rentalTransactionRepository,
      skinRepository,
      perfilRepository,
      walletRepository,
      notificationRepository
    );
  });

  it("Deve ser capaz de criar uma Rental Transaction", async () => {
    await Promise.all([
      makeCreatePerfil.execute("76561199205585878"),
      makeCreatePerfil.execute("76561199205585873"),
      makeCreateSkinRepository.execute({
        id: "124",
        skin_price: 200,
        seller_id: "76561199205585873",
      }),
      walletRepository.create({
        owner_id: "76561199205585878",
        owner_name: "Teste 1",
        value: 10000,
      }),
    ]);

    const createRentalTransaction = await sut.execute({
      owner_id: "76561199205585878",
      skin_id: "124",
      days_quantity: "7",
    });

    expect(createRentalTransaction.id).toEqual(expect.any(String));
  });

  it("Deve dar um error de Skin not Exist", async () => {
    await makeCreatePerfil.execute("76561199205585878");
    await makeCreatePerfil.execute("76561199205585873");

    const data = {
      owner_id: "76561199205585878",
      skin_id: "124",
      days_quantity: "7",
    };

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      SkinNotExistError
    );
  });

  it("Deve dar um error de Skin Already Been Announced", async () => {
    await Promise.all([
      makeCreatePerfil.execute("76561199205585878"),
      makeCreatePerfil.execute("76561199205585873"),
      makeCreateSkinRepository.execute({
        id: "124",
        skin_price: 100,
        seller_id: "76561199205585873",
      }),
      walletRepository.create({
        owner_id: "76561199205585878",
        owner_name: "Teste 1",
        value: 10000,
      }),
    ]);
    const data = {
      owner_id: "76561199205585878",
      skin_id: "124",
      days_quantity: "7",
    };

    await sut.execute(data);

    await expect(() =>
      sut.execute({
        owner_id: "123",
        skin_id: "124",
        days_quantity: "7",
      })
    ).rejects.toBeInstanceOf(SkinHasAlreadyBeenAnnounced);
  });

  it("Deve ser capaz de retirar o valor total da skin da carteira do comprador", async () => {
    const [, , skin, wallet] = await Promise.all([
      makeCreatePerfil.execute("76561199205585878"),
      makeCreatePerfil.execute("76561199205585873"),
      makeCreateSkinRepository.execute({
        id: "124",
        skin_price: 100,
        seller_id: "76561199205585873",
      }),
      walletRepository.create({
        owner_id: "76561199205585878",
        owner_name: "Teste 1",
        value: 1000,
      }),
    ]);

    await sut.execute({
      owner_id: "76561199205585878",
      skin_id: "124",
      days_quantity: "21",
    });

    const walletPrice = walletRepository.wallet[0].value;
    const valorRetirar = wallet.value - skin.skin_price;
    expect(walletPrice).toEqual(valorRetirar);
  });

  it("Deve ser capaz de criar as notificações ", async () => {
    const [comprador, vendedor] = await Promise.all([
      makeCreatePerfil.execute("76561199205585878"),
      makeCreatePerfil.execute("76561199205585873"),
      makeCreateSkinRepository.execute({
        id: "124",
        skin_price: 200,
        seller_id: "76561199205585873",
      }),
      walletRepository.create({
        owner_id: "76561199205585878",
        owner_name: "Teste 1",
        value: 1000,
      }),
    ]);

    await sut.execute({
      owner_id: "76561199205585878",
      skin_id: "124",
      days_quantity: "14",
    });
    const notificações = notificationRepository.notifications;

    expect(notificações[0].owner_id).toEqual(comprador.owner_id);
    expect(notificações[1].owner_id).toEqual(vendedor.owner_id);
  });

  it("Deve ser capaz adicionar o valor correto de total da skin menos a porcetagem", async () => {
    await Promise.all([
      makeCreatePerfil.execute("76561199205585878"),
      makeCreatePerfil.execute("76561199205585873"),
      makeCreateSkinRepository.execute({
        id: "124",
        skin_price: 200,
        seller_id: "76561199205585873",
      }),
      walletRepository.create({
        owner_id: "76561199205585878",
        owner_name: "Teste 1",
        value: 1000,
      }),
    ]);

    const create = await sut.execute({
      owner_id: "76561199205585878",
      skin_id: "124",
      days_quantity: "14",
    });
    expect(create.fee_total_price).toEqual(164);
  });

  it("Deve criar a notificação faltando 12h para finalizar a Rental Transaction", async () => {
    vi.useFakeTimers();
    const addSpy = vi.spyOn(notificationRepository, "create");

    await Promise.all([
      makeCreatePerfil.execute("76561199205585878"),
      makeCreatePerfil.execute("76561199205585873"),
      makeCreateSkinRepository.execute({
        id: "124",
        skin_name: "Teste cronjob",
        skin_price: 200,
        seller_id: "76561199205585873",
      }),
      walletRepository.create({
        owner_id: "76561199205585878",
        owner_name: "Teste 1",
        value: 1000,
      }),
    ]);

    const create = await sut.execute({
      owner_id: "76561199205585878",
      skin_id: "124",
      days_quantity: "7",
    });

    vi.advanceTimersByTime(24 * 60 * 60 * 1000 * 7);

    const notification = notificationRepository.notifications[2];

    expect(notification.owner_id).toEqual(create.owner_id);
    expect(notification.description).toContain("O tempo limite");
    expect(addSpy).toHaveBeenCalledTimes(3);
    addSpy.mockRestore();
  });
});
