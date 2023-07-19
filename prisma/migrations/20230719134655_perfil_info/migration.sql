-- CreateTable
CREATE TABLE "PerfilInfo" (
    "id" VARCHAR(36) NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "status_member" VARCHAR(255) NOT NULL,
    "delivery_time" VARCHAR(255) NOT NULL,
    "delivery_fee" VARCHAR(255) NOT NULL,
    "total_exchanges" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PerfilInfo_pkey" PRIMARY KEY ("id")
);
