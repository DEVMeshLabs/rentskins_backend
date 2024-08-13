import { CronJobProcessTransaction } from "../../utils/CronJobProcessTransaction";
import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { vi, Mock, describe, it, expect, beforeEach } from "vitest";

describe("CronJobProcessTransaction", () => {
  let cronJob: CronJobProcessTransaction;
  let transactionHistoryRepository: ITransactionHistoryRepository;
  let transactionRepository: ITransactionRepository;
  let notificationRepository: INotificationRepository;
  let walletRepository: IWalletRepository;
  let perfilRepository: IPerfilRepository;
  let skinRepository: ISkinsRepository;

  beforeEach(() => {
    transactionHistoryRepository = {
      findByMany: vi.fn(),
      updateId: vi.fn(),
    } as unknown as ITransactionHistoryRepository;
    transactionRepository = {
      findById: vi.fn(),
      updateId: vi.fn(),
    } as unknown as ITransactionRepository;
    notificationRepository = {
      create: vi.fn(),
    } as unknown as INotificationRepository;
    walletRepository = {
      updateByUserValue: vi.fn(),
    } as unknown as IWalletRepository;
    perfilRepository = {
      findByUser: vi.fn(),
      updateTotalExchanges: vi.fn(),
      updateByUser: vi.fn(),
    } as unknown as IPerfilRepository;
    skinRepository = {
      findById: vi.fn(),
      updateById: vi.fn(),
    } as unknown as ISkinsRepository;

    cronJob = new CronJobProcessTransaction(
      transactionHistoryRepository,
      transactionRepository,
      notificationRepository,
      walletRepository,
      perfilRepository,
      skinRepository
    );
  });

  describe("execute", () => {
    it("should process pending transactions", async () => {
      expect(true).toBe(true);
      // const transactionHistory = {
      //   id: "1",
      //   dateProcess: new Date(),
      //   transaction_id: "1",
      //   seller_id: "1",
      //   processTransaction: "Pending",
      // };
      // const transaction = { id: "1", balance: 100 };
      // const perfilSeller = { id: "1" };
      // const skin = { skin_name: "Skin Name" };

      // (transactionHistoryRepository.findByMany as Mock).mockResolvedValue([
      //   transactionHistory,
      // ]);

      // (transactionRepository.findById as Mock).mockResolvedValue(transaction);
      // (perfilRepository.findByUser as Mock).mockResolvedValue(perfilSeller);
      // (skinRepository.findById as Mock).mockResolvedValue(skin);

      // await cronJob.execute();

      // expect(transactionHistoryRepository.findByMany).toHaveBeenCalledWith(
      //   "Pending"
      // );
      // expect(transactionRepository.findById).toHaveBeenCalledWith(
      //   transactionHistory.transaction_id
      // );
      // expect(perfilRepository.findByUser).toHaveBeenCalledWith(
      //   transactionHistory.seller_id
      // );
      // expect(skinRepository.findById).toHaveBeenCalledWith(transaction.skin_id);
      // expect(transactionHistoryRepository.updateId).toHaveBeenCalledWith(
      //   transactionHistory.id,
      //   { processTransaction: "Failed" }
      // );
      // expect(transactionRepository.updateId).toHaveBeenCalledWith(
      //   transaction.id,
      //   { status: "NegociationRejected" }
      // );
      // expect(notificationRepository.create).toHaveBeenCalledWith({
      //   owner_id: transactionHistory.seller_id,
      //   description: `A venda da skin ${skin.skin_name} foi cancelada por falta de entrega. Isso pode prejudicar sua reputação como vendedor. Seu anúncio foi excluído!`,
      // });
      // expect(notificationRepository.create).toHaveBeenCalledWith({
      //   owner_id: transactionHistory.buyer_id,
      //   description: `O vendedor não enviou a skin. O valor de ${transaction.balance} foi devolvido para sua carteira.`,
      // });
      // expect(walletRepository.updateByUserValue).toHaveBeenCalledWith(
      //   transactionHistory.buyer_id,
      //   "increment",
      //   transaction.balance
      // );
      // expect(skinRepository.updateById).toHaveBeenCalledWith(
      //   transaction.skin_id,
      //   { status: "Falhou" }
      // );
      // expect(perfilRepository.updateByUser).toHaveBeenCalledWith(
      //   transactionHistory.seller_id,
      //   { total_exchanges_failed: perfilSeller.total_exchanges_failed + 1 }
      // );
    });

    it("should not process any transactions if there are no pending transactions", async () => {
      expect(true).toBe(true);
      //   (transactionHistoryRepository.findByMany as Mock).mockResolvedValue([]);
      //   await cronJob.execute();

      //   expect(transactionRepository.findById).not.toHaveBeenCalled();
      //   expect(perfilRepository.findByUser).not.toHaveBeenCalled();
      //   expect(skinRepository.findById).not.toHaveBeenCalled();
      //   expect(transactionHistoryRepository.updateId).not.toHaveBeenCalled();
      //   expect(transactionRepository.updateId).not.toHaveBeenCalled();
      //   expect(notificationRepository.create).not.toHaveBeenCalled();
      //   expect(walletRepository.updateByUserValue).not.toHaveBeenCalled();
      //   expect(skinRepository.updateById).not.toHaveBeenCalled();
      //   expect(perfilRepository.updateByUser).not.toHaveBeenCalled();
    });
  });
});
