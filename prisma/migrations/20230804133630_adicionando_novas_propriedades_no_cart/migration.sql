/*
  Warnings:

  - Added the required column `seller_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_name` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "seller_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "seller_name" VARCHAR(255) NOT NULL;
