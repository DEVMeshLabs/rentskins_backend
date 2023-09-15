/*
  Warnings:

  - You are about to drop the column `billing_address` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `billing_city` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `billing_neighborhood` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `billing_number` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `billing_state` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `billing_zip_code` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `customer_document` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `customer_email` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `customer_mobile` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `customer_name` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `installments` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `payment_type` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `processor_response` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `buyer_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skin_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Transaction_owner_id_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "billing_address",
DROP COLUMN "billing_city",
DROP COLUMN "billing_neighborhood",
DROP COLUMN "billing_number",
DROP COLUMN "billing_state",
DROP COLUMN "billing_zip_code",
DROP COLUMN "customer_document",
DROP COLUMN "customer_email",
DROP COLUMN "customer_mobile",
DROP COLUMN "customer_name",
DROP COLUMN "installments",
DROP COLUMN "owner_id",
DROP COLUMN "payment_type",
DROP COLUMN "processor_response",
DROP COLUMN "status",
DROP COLUMN "transaction_id",
ADD COLUMN     "bol_buyer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "bol_seller" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "buyer_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "seller_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "skin_id" VARCHAR(255) NOT NULL;
