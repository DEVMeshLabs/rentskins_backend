-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('Default', 'NegotiationSend', 'NegociationAccepted', 'NegociationRejected');

-- CreateEnum
CREATE TYPE "ProcessTransactionStatus" AS ENUM ('Default', 'Pending', 'Completed', 'Failed');

-- CreateTable
CREATE TABLE "Skin" (
    "id" VARCHAR(36) NOT NULL,
    "asset_id" VARCHAR(255) NOT NULL,
    "skin_image" VARCHAR(255) NOT NULL,
    "skin_name" VARCHAR(255) NOT NULL,
    "skin_market_hash_name" VARCHAR(255) NOT NULL,
    "skin_category" VARCHAR(255) NOT NULL,
    "skin_weapon" VARCHAR(255) NOT NULL,
    "skin_price" DOUBLE PRECISION NOT NULL,
    "pricesafe7d" DOUBLE PRECISION NOT NULL,
    "skin_float" VARCHAR(255) NOT NULL,
    "skin_paintseed" DOUBLE PRECISION NOT NULL,
    "skin_classid" VARCHAR(255) NOT NULL,
    "skin_instanceid" VARCHAR(255) NOT NULL,
    "skin_rarity" VARCHAR(255) NOT NULL,
    "skin_link_game" VARCHAR(255) NOT NULL,
    "skin_link_steam" VARCHAR(255) NOT NULL,
    "seller_name" VARCHAR(255) NOT NULL,
    "seller_id" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255),
    "status_float" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255),
    "borderColor" VARCHAR(255),
    "color" VARCHAR(255),
    "sale_type" VARCHAR(255)[],
    "stickers" JSONB,
    "saledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Skin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkinToCart" (
    "id" VARCHAR(36) NOT NULL,
    "skinId" VARCHAR(255) NOT NULL,
    "cartId" VARCHAR(255) NOT NULL,

    CONSTRAINT "SkinToCart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" VARCHAR(36) NOT NULL,
    "buyer_id" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "skinId" VARCHAR(36),

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" VARCHAR(36) NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" VARCHAR(36) NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "new" BOOLEAN DEFAULT true,
    "type" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "skin_id" VARCHAR(36),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuration" (
    "id" VARCHAR(36) NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "owner_email" VARCHAR(255),
    "owner_phone" VARCHAR(255),
    "owner_cpf" VARCHAR(14),
    "url_trade" VARCHAR(255),
    "url_sell" VARCHAR(255),
    "agreed_with_emails" BOOLEAN DEFAULT false,
    "agreed_with_terms" BOOLEAN DEFAULT false,
    "key" VARCHAR(32),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perfil" (
    "id" VARCHAR(36) NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "owner_type" VARCHAR(255) NOT NULL DEFAULT 'Usuario',
    "owner_country" VARCHAR(5),
    "stripe_id" VARCHAR(255),
    "account_status" VARCHAR(20) NOT NULL DEFAULT 'Ativo',
    "steam_url" VARCHAR(255) NOT NULL,
    "picture" VARCHAR(255) NOT NULL,
    "delivery_time" VARCHAR(255) NOT NULL,
    "total_exchanges" INTEGER NOT NULL DEFAULT 0,
    "total_exchanges_completed" INTEGER NOT NULL DEFAULT 0,
    "total_exchanges_failed" INTEGER NOT NULL DEFAULT 0,
    "reliability" VARCHAR(255) NOT NULL DEFAULT 'Sem informações',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "steam_created_date" TIMESTAMP(3) NOT NULL,
    "configurationId" VARCHAR(36),
    "cart_id" TEXT,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" VARCHAR(36) NOT NULL,
    "skin_id" VARCHAR(255) NOT NULL,
    "buyer_id" VARCHAR(255) NOT NULL,
    "seller_id" VARCHAR(255) NOT NULL,
    "seller_confirm" VARCHAR(255) DEFAULT 'Pendente',
    "buyer_confirm" VARCHAR(255) DEFAULT 'Pendente',
    "balance" DOUBLE PRECISION NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'Default',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salesAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionHistory" (
    "id" VARCHAR(36) NOT NULL,
    "buyer_id" VARCHAR(255) NOT NULL,
    "seller_id" VARCHAR(255) NOT NULL,
    "asset_id" VARCHAR(255) NOT NULL,
    "processTransaction" "ProcessTransactionStatus" NOT NULL DEFAULT 'Pending',
    "dateProcess" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rental" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "transaction_id" VARCHAR(255),
    "rentalTransaction_id" VARCHAR(255),

    CONSTRAINT "TransactionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalTransaction" (
    "id" VARCHAR(36) NOT NULL,
    "seller_id" VARCHAR(255) NOT NULL,
    "buyer_id" VARCHAR(255) NOT NULL,
    "skin_id" VARCHAR(255) NOT NULL,
    "total_price" DOUBLE PRECISION,
    "remainder" DOUBLE PRECISION,
    "fee_total_price" DOUBLE PRECISION,
    "days_quantity" VARCHAR(5) NOT NULL,
    "status" VARCHAR(255) DEFAULT 'Em andamento',
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RentalTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_buyer_id_key" ON "Cart"("buyer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_owner_id_key" ON "Wallet"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_owner_id_key" ON "Configuration"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_owner_id_key" ON "Perfil"("owner_id");

-- AddForeignKey
ALTER TABLE "SkinToCart" ADD CONSTRAINT "SkinToCart_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinToCart" ADD CONSTRAINT "SkinToCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "Skin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "Skin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_rentalTransaction_id_fkey" FOREIGN KEY ("rentalTransaction_id") REFERENCES "RentalTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
