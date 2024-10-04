-- CreateEnum
CREATE TYPE "DecisionUser" AS ENUM ('buy', 'return');

-- AlterTable
ALTER TABLE "RentalTransaction" ADD COLUMN     "decisionUser" "DecisionUser";
