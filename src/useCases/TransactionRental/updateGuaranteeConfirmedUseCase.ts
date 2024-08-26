import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { Prisma } from "@prisma/client";
import type { ISkinGuaranteeRepository } from "@/repositories/interfaceRepository/ISkinGuarantee";
import { StatusHasAlreadyBeenUpdatedError } from "../@errors/ws/StatusHasAlreadyBeenUpdatedError";

type RentalTransactionWithIncludes = Prisma.RentalTransactionGetPayload<{
  include: {
    skinsRent: true;
    skinsGuarantee: true;
  };
}>;

export class UpdateGuaranteeConfirmedUseCase {
  constructor(
    private readonly transactionRepository: IRentalTransactionRepository,
    private readonly notificationRepository: INotificationRepository,
    private readonly skinGuaranteeRepository: ISkinGuaranteeRepository
  ) {}

  async execute(id: string) {
    const transaction = (await this.transactionRepository.findById(
      id
    )) as RentalTransactionWithIncludes;

    if (!transaction) {
      throw new TransactionNotExistError();
    }

    if (transaction.status !== "WaitingForAdministrators") {
      throw new StatusHasAlreadyBeenUpdatedError();
    }

    await Promise.all([
      this.updateTransactionStatus(transaction.id),
      this.updateSkinsGuarantee(
        transaction.daysQuantity,
        transaction.skinsGuarantee
      ),
      this.createNotifications(transaction.skinsRent),
    ]);

    return transaction;
  }

  private async updateTransactionStatus(id: string) {
    return this.transactionRepository.updateId(id, {
      status: "WaitingForBuyerConfirmation",
      guaranteeSentAt: new Date(),
    });
  }

  private async updateSkinsGuarantee(
    days: number,
    skinsGuarantee: Array<{ id: string }>
  ) {
    const updatePromises = skinsGuarantee.map((skin) => {
      const currentDate = new Date();
      const withdrawAfter = new Date(currentDate);
      withdrawAfter.setDate(currentDate.getDate() + days);

      return this.skinGuaranteeRepository.updateById(skin.id, {
        addedToBackpackAt: currentDate,
        withdrawAfter,
      });
    });

    await Promise.all(updatePromises);
  }

  private async createNotifications(skinsRent: Array<{ seller_id: string }>) {
    const notifications = skinsRent.map((skin) => ({
      owner_id: skin.seller_id,
      description:
        "A transação foi confirmada pelos administradores. Aguarde a confirmação do comprador.",
    }));

    const notificationPromises = notifications.map((notification) =>
      this.notificationRepository.create(notification)
    );
    await Promise.all(notificationPromises);
  }
}
