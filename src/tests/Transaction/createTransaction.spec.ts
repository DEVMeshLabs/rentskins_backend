// import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";
// import { inMemoryTransactionRepository } from "@/repositories/in-memory/inMemoryTransactionRepository";
// import { CreateSkinUseCase } from "@/useCases/Skin/createSkinUseCase";
// import { CreateTransactionUseCase } from "@/useCases/Transaction/createTransactionUseCase";
// import { expect, describe, beforeEach, it } from "vitest";

// let transactionRepository: inMemoryTransactionRepository;
// let sut: CreateTransactionUseCase;

// describe("Transaction Use Case", () => {
//   beforeEach(async () => {
//     transactionRepository = new InMemorySkinRepository();
//     sut = new CreateSkinUseCase(transactionRepository);
//   });

//   it("should be able to create a skin", async () => {
//     const transaction = await sut.execute({
//       skin_id: "562ac434-9416-43ac-87f7-057bc2052cb0",
//       seller_id: "76561199205585878",
//       buyer_id: "76561198195920183",
//     });

//     expect(transaction.createdAt).toBeTruthy();
//   });
// });
