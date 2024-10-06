/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Entrada` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Entrada` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `Saida` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Saida` table. All the data in the column will be lost.
  - Added the required column `data` to the `Entrada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Saida` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrada" DROP COLUMN "criadoEm",
DROP COLUMN "tipo",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Saida" DROP COLUMN "criadoEm",
DROP COLUMN "tipo",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL;
