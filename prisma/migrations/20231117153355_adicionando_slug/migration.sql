/*
  Warnings:

  - You are about to alter the column `key` on the `Configuration` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(32)`.
  - You are about to drop the column `median_price` on the `Skin` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Skin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Configuration" ALTER COLUMN "key" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "Skin" DROP COLUMN "median_price",
ADD COLUMN     "slug" VARCHAR(255) NOT NULL;
