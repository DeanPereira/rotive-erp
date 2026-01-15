/*
  Warnings:

  - You are about to drop the column `ativa` on the `Oficina` table. All the data in the column will be lost.
  - You are about to drop the column `cnpj` on the `Oficina` table. All the data in the column will be lost.
  - You are about to drop the column `criadaEm` on the `Oficina` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `papel` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GERENTE', 'MECANICO', 'USER');

-- DropIndex
DROP INDEX "Oficina_cnpj_key";

-- DropIndex
DROP INDEX "Usuario_email_oficinaId_key";

-- AlterTable
ALTER TABLE "Oficina" DROP COLUMN "ativa",
DROP COLUMN "cnpj",
DROP COLUMN "criadaEm",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "criadoEm",
DROP COLUMN "papel",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "PapelUsuario";

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
