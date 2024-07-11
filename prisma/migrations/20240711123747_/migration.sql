/*
  Warnings:

  - You are about to drop the column `skins` on the `RentalTransaction` table. All the data in the column will be lost.
  - You are about to alter the column `skinId` on the `SkinToCart` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(36)`.
  - You are about to alter the column `cartId` on the `SkinToCart` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(36)`.
  - You are about to drop the column `asset_id` on the `TransactionHistory` table. All the data in the column will be lost.
  - Made the column `agreed_with_emails` on table `Configuration` required. This step will fail if there are existing NULL values in that column.
  - Made the column `agreed_with_terms` on table `Configuration` required. This step will fail if there are existing NULL values in that column.
  - Made the column `new` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SkinToCart" DROP CONSTRAINT "SkinToCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "SkinToCart" DROP CONSTRAINT "SkinToCart_skinId_fkey";

-- AlterTable
ALTER TABLE "Configuration" ALTER COLUMN "agreed_with_emails" SET NOT NULL,
ALTER COLUMN "agreed_with_terms" SET NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "new" SET NOT NULL;

-- AlterTable
ALTER TABLE "RentalTransaction" DROP COLUMN "skins";

-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "rentalTransactionId" VARCHAR(36);

-- AlterTable
ALTER TABLE "SkinToCart" ALTER COLUMN "skinId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "cartId" SET DATA TYPE VARCHAR(36);

-- AlterTable
ALTER TABLE "TransactionHistory" DROP COLUMN "asset_id",
ADD COLUMN     "skins" JSONB[];

-- AddForeignKey
ALTER TABLE "Skin" ADD CONSTRAINT "Skin_rentalTransactionId_fkey" FOREIGN KEY ("rentalTransactionId") REFERENCES "RentalTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinToCart" ADD CONSTRAINT "SkinToCart_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinToCart" ADD CONSTRAINT "SkinToCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
