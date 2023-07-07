-- CreateTable
CREATE TABLE "Skin" (
    "id" VARCHAR(36) NOT NULL,
    "skin_image" VARCHAR(255) NOT NULL,
    "skin_name" VARCHAR(255) NOT NULL,
    "skin_category" VARCHAR(255) NOT NULL,
    "skin_weapon" VARCHAR(255) NOT NULL,
    "skin_price" VARCHAR(255) NOT NULL,
    "skin_float" VARCHAR(255) NOT NULL,
    "skin_color" VARCHAR(255) NOT NULL,
    "skin_link_game" VARCHAR(255) NOT NULL,
    "skin_link_steam" VARCHAR(255) NOT NULL,
    "seller_name" VARCHAR(255) NOT NULL,
    "seller_id" VARCHAR(255) NOT NULL,
    "buyer_name" VARCHAR(255),
    "buyer_id" VARCHAR(255),
    "status" VARCHAR(255) NOT NULL,
    "status_float" VARCHAR(255) NOT NULL,
    "sale_type" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "cartId" TEXT,

    CONSTRAINT "Skin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" VARCHAR(36) NOT NULL,
    "buyer_name" VARCHAR(255) NOT NULL,
    "buyer_id" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" VARCHAR(36) NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255) NOT NULL DEFAULT '0',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuration" (
    "id" VARCHAR(36) NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "owner_email" VARCHAR(255) NOT NULL,
    "url_trade" VARCHAR(255) NOT NULL,
    "url_sell" VARCHAR(255) NOT NULL,
    "agreed_with_emails" BOOLEAN DEFAULT false,
    "agreed_with_terms" BOOLEAN DEFAULT false,
    "steam_guard" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" VARCHAR(36) NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "new" BOOLEAN DEFAULT true,
    "skin_id" VARCHAR(36),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Skin" ADD CONSTRAINT "Skin_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "Skin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
