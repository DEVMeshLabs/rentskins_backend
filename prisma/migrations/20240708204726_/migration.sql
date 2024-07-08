/*
  Warnings:

  - Added the required column `pricesafe7d` to the `Skin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skin_classid` to the `Skin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skin_instanceid` to the `Skin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skin_market_hash_name` to the `Skin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skin_paintseed` to the `Skin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "borderColor" VARCHAR(255),
ADD COLUMN     "color" VARCHAR(255),
ADD COLUMN     "pricesafe7d" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "skin_classid" VARCHAR(255) NOT NULL,
ADD COLUMN     "skin_instanceid" VARCHAR(255) NOT NULL,
ADD COLUMN     "skin_market_hash_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "skin_paintseed" DOUBLE PRECISION NOT NULL;
