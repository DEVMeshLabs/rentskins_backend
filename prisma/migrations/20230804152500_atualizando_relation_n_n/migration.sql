-- DropForeignKey
ALTER TABLE "Skin" DROP CONSTRAINT "Skin_cartId_fkey";

-- CreateTable
CREATE TABLE "_CartToSkin" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartToSkin_AB_unique" ON "_CartToSkin"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToSkin_B_index" ON "_CartToSkin"("B");

-- AddForeignKey
ALTER TABLE "_CartToSkin" ADD CONSTRAINT "_CartToSkin_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToSkin" ADD CONSTRAINT "_CartToSkin_B_fkey" FOREIGN KEY ("B") REFERENCES "Skin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
