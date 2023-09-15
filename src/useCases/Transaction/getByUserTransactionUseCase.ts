import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class GetByUserTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}
  async execute(id: string, query: string) {
    const findUser = await this.transactionRepository.findByUser(id, query);

    if (!findUser) {
      throw new PerfilNotExistError();
    }

    return findUser;
  }
}
