-- AlterTable
ALTER TABLE "GuaranteeSkin" ADD COLUMN     "isSolicited" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "returnedAt" TIMESTAMP(3);
