/*
  Warnings:

  - The `owner_type` column on the `Perfil` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Perfil" DROP COLUMN "owner_type",
ADD COLUMN     "owner_type" VARCHAR(255) NOT NULL DEFAULT 'Usuario';

-- DropEnum
DROP TYPE "type_user";
