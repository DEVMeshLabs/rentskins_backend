/*
  Warnings:

  - The `total_exchanges` column on the `Perfil` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `steam_level` column on the `Perfil` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Perfil" DROP COLUMN "total_exchanges",
ADD COLUMN     "total_exchanges" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "steam_level",
ADD COLUMN     "steam_level" INTEGER;
