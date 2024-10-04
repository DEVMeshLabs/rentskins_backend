-- AlterTable
ALTER TABLE "RentalTransaction" ADD COLUMN     "returnDueAt" TIMESTAMP(3),
ADD COLUMN     "sellerConfirmedAt" TIMESTAMP(3),
ADD COLUMN     "trialPeriodStartedAt" TIMESTAMP(3);
