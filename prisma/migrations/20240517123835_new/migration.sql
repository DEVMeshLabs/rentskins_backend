/*
  Warnings:

  - The `status` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `skin_classid` to the `Skin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skin_instanceid` to the `Skin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skin_market_hash_name` to the `Skin` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('Default', 'NegotiationSend', 'NegociationAccepted', 'NegociationRejected');

-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "skin_classid" VARCHAR(255) NOT NULL,
ADD COLUMN     "skin_instanceid" VARCHAR(255) NOT NULL,
ADD COLUMN     "skin_market_hash_name" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "status",
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'Default';
