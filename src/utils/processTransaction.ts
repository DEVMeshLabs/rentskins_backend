import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import axios from "axios";

export class ProcessTransaction {
  constructor(
    private transactionRepository: ITransactionRepository,
    private perfilRepository: IPerfilRepository,
    private skinRepository: ISkinsRepository,
    private walletRepository: IWalletRepository,
    private notificationsRepository: INotificationRepository
  ) {}

  async execute(
    createTransaction,
    findSkin,
    perfilBuyer,
    perfilSeller
  ): Promise<void> {
    console.log("Executando processTransaction");
    const isValidEnv =
      process.env.NODE_ENV === "production"
        ? "https://api-rentskin-backend-on.onrender.com"
        : "http://localhost:3333";

    const findTransaction = await this.transactionRepository.findById(
      createTransaction.id
    );

    if (findTransaction.status === "Em andamento") {
      const inventario = await axios
        .get(`${isValidEnv}/v1/skins/inventory/${perfilSeller.owner_id}`)
        .then((response) => response.data)
        .catch((err) => err.message);

      const isAlreadyExistSkinInventory = inventario.some((item: any) => {
        return item.assetid === findSkin.asset_id;
      });

      if (isAlreadyExistSkinInventory) {
        console.log("Atualizando a wallet do vendedor");

        await Promise.all([
          this.walletRepository.updateByUserValue(
            perfilBuyer.owner_id,
            "increment",
            findSkin.skin_price
          ),
          this.transactionRepository.updateId(createTransaction.id, {
            status: "Falhou",
          }),
          this.notificationsRepository.create({
            owner_id: perfilSeller.owner_id,
            description: `O prazo de entrega do ${findSkin.skin_name} expirou, e a troca foi cancelada devido à não entrega.`,
            skin_id: findSkin.id,
          }),

          this.notificationsRepository.create({
            owner_id: perfilBuyer.owner_id,
            description: `A compra do item ${findSkin.skin_name} foi cancelada porque o vendedor não enviou o item a tempo, e o valor foi reembolsado para a sua conta.`,
            skin_id: findSkin.id,
          }),

          this.skinRepository.updateById(findSkin.id, {
            status: "Falhou",
          }),
        ]);
      } else {
        console.log("Verificando o inventario do comprador");
        const inventarioBuyer = await axios
          .get(`${isValidEnv}/v1/skins/inventory/${perfilBuyer.owner_id}`)
          .then((response) => response.data)
          .catch((err) => err.message);

        const isAlreadyExistSkinInventoryBuyer = inventarioBuyer.some(
          (item: any) =>
            item.name === findSkin.skin_name &&
            item.market_name === findSkin.seller_name
        );

        if (!isAlreadyExistSkinInventoryBuyer) {
          console.log("Atualizando a wallet do comprador");

          await Promise.all([
            this.walletRepository.updateByUserValue(
              perfilBuyer.owner_id,
              "increment",
              findSkin.skin_price
            ),
            this.transactionRepository.updateId(createTransaction.id, {
              status: "Falhou",
            }),
            this.notificationsRepository.create({
              owner_id: perfilSeller.owner_id,
              description: `A venda do item ${findSkin.skin_name} foi cancelada.`,
              skin_id: findSkin.id,
            }),

            this.notificationsRepository.create({
              owner_id: perfilBuyer.owner_id,
              description: `A compra do item ${findSkin.skin_name} foi cancelada.`,
              skin_id: findSkin.id,
            }),

            this.skinRepository.updateById(findSkin.id, {
              status: "Falhou",
            }),
          ]);
        }
      }
    }
  }
}
