import axios from "axios";

export async function processTransaction(
  createTransaction,
  findSkin,
  perfilSeller,
  perfilBuyer,
  buyer_id,
  seller_id
) {
  if (isAlreadyExistSkinInventory) {
    console.log("Atualizando a wallet do vendedor");
    // ---------- REFATORAR ------------------
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
    // ---------------------------------------
  } else if (!isAlreadyExistSkinInventory(buyer_id, findSkin)) {
    console.log("Verificando o inventario do comprador");

    if (!isAlreadyExistSkinInventory(buyer_id, findSkin)) {
      console.log("Atualizando a wallet do comprador");
      await Promise.all([
        this.walletRepository.updateByUserValue(
          buyer_id,
          "increment",
          findSkin.skin_price
        ),
        this.transactionRepository.updateId(createTransaction.id, {
          status: "Falhou",
        }),
        this.notificationsRepository.create({
          owner_id: seller_id,
          description: `A venda do item ${findSkin.skin_name} foi cancelada.`,
          skin_id: findSkin.id,
        }),

        this.notificationsRepository.create({
          owner_id: buyer_id,
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

async function isAlreadyExistSkinInventory(seller_id: string, findSkin) {
  const isValidEnv =
    process.env.NODE_ENV === "production"
      ? "https://api-rentskin-backend-on.onrender.com"
      : "http://localhost:3333";

  const inventario = await axios
    .get(`${isValidEnv}/v1/skins/inventory/${seller_id}`)
    .then((response) => response.data)
    .catch((err) => err.message);

  return inventario.some((item: any) => {
    return item.assetid === findSkin.asset_id;
  });
}
