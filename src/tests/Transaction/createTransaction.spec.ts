import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryTransactionRepository } from "@/repositories/in-memory/inMemoryTransactionRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { InsufficientFundsError } from "@/useCases/@errors/Wallet/InsufficientFundsError";
import { WalletNotExistsError } from "@/useCases/@errors/Wallet/WalletNotExistsError";
import { CreateTransactionUseCase } from "@/useCases/Transaction/createTransactionUseCase";
import { expect, describe, beforeEach, it } from "vitest";

let transactionRepository: InMemoryTransactionRepository;
let perfilRepository: InMemoryPerfilRepository;
let skinRepository: InMemorySkinRepository;
let walletRepository: InMemoryWalletRepository;
let notificationsRepository: InMemoryNotificationRepository;
let sut: CreateTransactionUseCase;

async function createSampleSkin() {
  return await skinRepository.create({
    asset_id: "10828437704",
    skin_image: "https://bit.ly/3Jn6aqn",
    skin_name: "exlucida | Trigger Disciplineeeee",
    skin_category: "NovaSkins",
    skin_weapon: "Test skin exlucidaaaa",
    skin_price: 500,
    skin_float: "0,10072",
    median_price: 253,
    seller_name: "Caçadora de demonios",
    seller_id: "76561199205585878",
    skin_rarity: "8650AC",
    status: "Pending",
    sale_type: "Caçadora",
    status_float: "Muito usada",
    skin_link_game: "/",
    skin_link_steam: "/",
  });
}

async function createSampleProfile(owner_id: string, owner_name: string) {
  return await perfilRepository.create({
    owner_id,
    owner_name,
    picture: "asdadasdasd",
    steam_url: "https://steamcommunity.com/profiles/76561198195920183",
    steam_level: 0,
    steam_created_date: "your_value_here",
  });
}

describe("Transaction Use Case", () => {
  beforeEach(async () => {
    transactionRepository = new InMemoryTransactionRepository();
    perfilRepository = new InMemoryPerfilRepository();
    skinRepository = new InMemorySkinRepository();
    walletRepository = new InMemoryWalletRepository();
    notificationsRepository = new InMemoryNotificationRepository();

    sut = new CreateTransactionUseCase(
      transactionRepository,
      perfilRepository,
      skinRepository,
      walletRepository,
      notificationsRepository
    );
  });

  it("Deve ser capaz de criar uma transação", async () => {
    const [skin] = await Promise.all([
      createSampleSkin(),
      createSampleProfile("76561199205585878", "Italo araújo"),
      createSampleProfile("76561198195920183", "Araujo"),
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

    const createTransaction = await sut.execute({
      skin_id: skin.id,
      seller_id: vendedor.owner_id,
      buyer_id: comprador.owner_id,
    });

    const [getUser, buyerWallet, getTransaction] = await Promise.all([
      perfilRepository.findByUser(vendedor.owner_id),
      walletRepository.findByUser(comprador.owner_id),
      transactionRepository.findById(createTransaction.id),
    ]);

    expect(skin.id).toEqual(expect.any(String));
    expect(createTransaction.id).toEqual(expect.any(String));
    expect(createTransaction.balance).toEqual(500);
    expect(getUser.total_exchanges).toEqual(1);
    expect(buyerWallet.value).toEqual(4500);
    expect(getTransaction.status).toEqual("Em andamento");
  });

  it("Verificando a Existência do Perfil", async () => {
    await expect(() =>
      sut.execute({
        skin_id: "sadasdasdasdasd",
        seller_id: "76561199205585878",
        buyer_id: "76561198195920183",
      })
    ).rejects.toBeInstanceOf(PerfilNotExistError);
  });

  it("Verificando a Existência da Skin", async () => {
    await Promise.all([
      createSampleProfile("76561199205585878", "Italo araújo"),
      createSampleProfile("76561198195920183", "Araujo"),
    ]);

    await expect(() =>
      sut.execute({
        skin_id: "sadasdasdasdasd",
        seller_id: "76561199205585878",
        buyer_id: "76561198195920183",
      })
    ).rejects.toBeInstanceOf(SkinNotExistError);
  });

  it("Verificando a Existência da Carteira", async () => {
    const [skin] = await Promise.all([
      createSampleSkin(),
      createSampleProfile("76561199205585878", "Italo araújo"),
      createSampleProfile("76561198195920183", "Araujo"),
    ]);

    await expect(() =>
      sut.execute({
        skin_id: skin.id,
        seller_id: "76561199205585878",
        buyer_id: "76561198195920183",
      })
    ).rejects.toBeInstanceOf(WalletNotExistsError);
  });

  it("Verificando Saldo Insuficiente", async () => {
    const [skin] = await Promise.all([
      createSampleSkin(),
      createSampleProfile("76561199205585878", "Italo araújo"),
      createSampleProfile("76561198195920183", "Araujo"),
      walletRepository.create({
        owner_name: "Italo",
        owner_id: "76561199205585878",
      }),

      walletRepository.create({
        owner_name: "Araujo",
        owner_id: "76561198195920183",
        value: 0,
      }),
    ]);

    await expect(() =>
      sut.execute({
        skin_id: skin.id,
        seller_id: "76561199205585878",
        buyer_id: "76561198195920183",
      })
    ).rejects.toBeInstanceOf(InsufficientFundsError);
  });
});
