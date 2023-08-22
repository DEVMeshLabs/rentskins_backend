-- DropForeignKey
ALTER TABLE "Perfil" DROP CONSTRAINT "Perfil_cart_id_fkey";

-- AlterTable
ALTER TABLE "Perfil" ALTER COLUMN "cart_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
