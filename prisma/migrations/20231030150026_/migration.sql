/*
  Warnings:

  - A unique constraint covering the columns `[owner_email]` on the table `Configuration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_phone]` on the table `Configuration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_cpf]` on the table `Configuration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url_trade]` on the table `Configuration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Configuration_owner_email_key" ON "Configuration"("owner_email");

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_owner_phone_key" ON "Configuration"("owner_phone");

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_owner_cpf_key" ON "Configuration"("owner_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_url_trade_key" ON "Configuration"("url_trade");
