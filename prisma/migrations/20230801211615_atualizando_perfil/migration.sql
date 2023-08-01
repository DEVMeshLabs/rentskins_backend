/*
  Warnings:

  - Added the required column `steam_level` to the `Perfil` table without a default value. This is not possible if the table is not empty.
  - Made the column `status_member` on table `Perfil` required. This step will fail if there are existing NULL values in that column.
  - Made the column `delivery_time` on table `Perfil` required. This step will fail if there are existing NULL values in that column.
  - Made the column `delivery_fee` on table `Perfil` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_exchanges` on table `Perfil` required. This step will fail if there are existing NULL values in that column.
  - Made the column `account_date` on table `Perfil` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Perfil" ADD COLUMN     "steam_level" VARCHAR(255) NOT NULL,
ALTER COLUMN "status_member" SET NOT NULL,
ALTER COLUMN "delivery_time" SET NOT NULL,
ALTER COLUMN "delivery_fee" SET NOT NULL,
ALTER COLUMN "total_exchanges" SET NOT NULL,
ALTER COLUMN "account_date" SET NOT NULL;
