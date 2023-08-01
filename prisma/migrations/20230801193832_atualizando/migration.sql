/*
  Warnings:

  - You are about to drop the `PerfilInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PerfilInfo";

-- CreateTable
CREATE TABLE "Perfil" (
    "id" VARCHAR(36) NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "status_member" VARCHAR(255) DEFAULT 'Membro novo',
    "delivery_time" VARCHAR(255) DEFAULT 'Sem informações no momento',
    "delivery_fee" VARCHAR(255) DEFAULT 'Sem informações no momento',
    "total_exchanges" VARCHAR(255) DEFAULT 'Sem informações no momento',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);
