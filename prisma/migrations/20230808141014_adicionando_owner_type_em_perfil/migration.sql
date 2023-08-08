-- CreateEnum
CREATE TYPE "type_user" AS ENUM ('Administrador', 'Usuario');

-- AlterTable
ALTER TABLE "Perfil" ADD COLUMN     "owner_type" "type_user" NOT NULL DEFAULT 'Usuario';
