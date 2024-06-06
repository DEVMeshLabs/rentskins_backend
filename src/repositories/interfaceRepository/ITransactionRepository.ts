import { Prisma, Transaction } from "@prisma/client";

export interface ITransactionRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<any>;
  findByMany(): Promise<Transaction[]>;
  findByUser(id: string, query?: string): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
  findBySkinTransaction(skin_id: string): Promise<Transaction | null>;
  transactionCountAll(seller_id: string): Promise<number>;
  findByManyUser(seller_id: string): Promise<Transaction[]>;
  updateConfirm(
    id: string,
    status: "Recusado" | "Aceito",
    query: "buyer" | null
  ): Promise<Transaction>;
  updateId(
    id: string,
    data: Prisma.TransactionUncheckedUpdateInput
  ): Promise<Transaction>;
  updateStatus(
    id: string,
    status:
      | "Default"
      | "NegotiationSend"
      | "NegociationAccepted"
      | "NegociationRejected"
  ): Promise<Transaction>;
}
