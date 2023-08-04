/*
  Warnings:

  - You are about to alter the column `cartId` on the `Skin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to drop the `_CartToSkin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartToSkin" DROP CONSTRAINT "_CartToSkin_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToSkin" DROP CONSTRAINT "_CartToSkin_B_fkey";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "skinId" VARCHAR(36);

-- AlterTable
ALTER TABLE "Skin" ALTER COLUMN "cartId" SET DATA TYPE VARCHAR(36);

-- DropTable
DROP TABLE "_CartToSkin";

-- CreateTable
CREATE TABLE "SkinToCart" (
    "id" VARCHAR(36) NOT NULL,
    "skinId" VARCHAR(255) NOT NULL,
    "cartId" VARCHAR(255) NOT NULL,

    CONSTRAINT "SkinToCart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SkinToCart" ADD CONSTRAINT "SkinToCart_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinToCart" ADD CONSTRAINT "SkinToCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
