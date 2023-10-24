import { InMemoryNotificationRepository } from "@/repositories/in-memory/inMemoryNotificationRepository";
import { InMemoryPerfilRepository } from "@/repositories/in-memory/inMemoryPerfilRepository";
import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
import { InMemoryTransactionRepository } from "@/repositories/in-memory/inMemoryTransactionRepository";
import { InMemoryWalletRepository } from "@/repositories/in-memory/inMemoryWalletRepository";
import { CreateTransactionUseCase } from "@/useCases/Transaction/createTransactionUseCase";
import { expect, describe, beforeEach, it } from "vitest";

let transactionRepository: InMemoryTransactionRepository;
let perfilRepository: InMemoryPerfilRepository;
let skinRepository: InMemorySkinRepository;
let walletRepository: InMemoryWalletRepository;
let notificationsRepository: InMemoryNotificationRepository;
let sut: CreateTransactionUseCase;

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

  it("should be able to create a transaction", async () => {
    const skin = await skinRepository.create({
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

    await perfilRepository.create({
      owner_id: "76561199205585878",
      owner_name: "Italo araújo",
      picture: "asdadasdasd",
      steam_url: "https://steamcommunity.com/profiles/76561198195920183",
      steam_level: 0,
      steam_created_date: "your_value_here",
    });

    await perfilRepository.create({
      owner_id: "76561198195920183",
      owner_name: "Araujo",
      picture: "asdadasdasd",
      steam_url: "https://steamcommunity.com/profiles/76561198195920183",
      steam_level: 0,
      steam_created_date: "your_value_here",
    });

    const vendedor = await walletRepository.create({
      owner_name: "Italo",
      owner_id: "76561199205585878",
    });

    const comprador = await walletRepository.create({
      owner_name: "Araujo",
      owner_id: "76561198195920183",
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
});
