/*
  Warnings:

  - You are about to drop the column `active` on the `Zone` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Zone" DROP COLUMN "active",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "extraFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "multiplier" SET DEFAULT 1;
