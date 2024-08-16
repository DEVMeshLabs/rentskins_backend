import dayjs from "dayjs";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { Prisma } from "@prisma/client";

type RentalTransactionWithIncludes = Prisma.RentalTransactionGetPayload<{
  include: {
    skinsRent: true;
  };
}>;

export class UpdateGuaranteeConfirmedUseCase {
  constructor(
    private readonly transactionRepository: IRentalTransactionRepository,
    private readonly notificationRepository: INotificationRepository
  ) {}

  async execute(id: string) {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new TransactionNotExistError();
    } else if (transaction.status !== "WaitingForAdministrators") {
      throw new Error("StatusHasAlreadyBeenUpdatedError");
    }

    const { daysQuantity, skinsRent } =
      transaction as RentalTransactionWithIncludes;

    const endDateNew = dayjs().add(Number(daysQuantity), "day").format();

    const updatedTransaction = await this.transactionRepository.updateId(id, {
      status: "WaitingForBuyerConfirmation",
      startDate: new Date(),
      endDate: endDateNew,
    });

    const notifications = skinsRent.map((skin) => ({
      owner_id: skin.seller_id,
      description:
        "A transação foi confirmada pelos administradores. Por favor, envie os itens para o comprador.",
    }));

    await Promise.all(
      notifications.map(
        this.notificationRepository.create.bind(this.notificationRepository)
      )
    );

    return updatedTransaction;
  }
}
