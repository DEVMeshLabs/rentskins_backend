/*
  Warnings:

  - Added the required column `pix_key` to the `WithdrawalRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pix_key_type` to the `WithdrawalRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WithdrawalRequest" ADD COLUMN     "pix_key" VARCHAR(255) NOT NULL,
ADD COLUMN     "pix_key_type" VARCHAR(255) NOT NULL;
