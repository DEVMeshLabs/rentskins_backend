/*
  Warnings:

  - The `price` column on the `Cart` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `account_date` on the `Perfil` table. All the data in the column will be lost.
  - Added the required column `steam_create` to the `Perfil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Perfil" DROP COLUMN "account_date",
ADD COLUMN     "steam_create" TIMESTAMP(3) NOT NULL;
