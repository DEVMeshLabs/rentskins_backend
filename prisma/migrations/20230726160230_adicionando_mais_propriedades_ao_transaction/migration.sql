/*
  Warnings:

  - Added the required column `billing_address` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billing_city` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billing_neighborhood` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billing_number` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billing_state` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billing_zip_code` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_document` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_email` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_mobile` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "billing_address" VARCHAR(255) NOT NULL,
ADD COLUMN     "billing_city" VARCHAR(255) NOT NULL,
ADD COLUMN     "billing_neighborhood" VARCHAR(255) NOT NULL,
ADD COLUMN     "billing_number" VARCHAR(255) NOT NULL,
ADD COLUMN     "billing_state" VARCHAR(255) NOT NULL,
ADD COLUMN     "billing_zip_code" VARCHAR(255) NOT NULL,
ADD COLUMN     "customer_document" VARCHAR(255) NOT NULL,
ADD COLUMN     "customer_email" VARCHAR(255) NOT NULL,
ADD COLUMN     "customer_mobile" VARCHAR(255) NOT NULL,
ADD COLUMN     "customer_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);
