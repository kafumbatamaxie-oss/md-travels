/*
  Warnings:

  - You are about to drop the column `additionalRequirements` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedPrice` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `pricingType` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleCategory` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerDay` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `vehicleId` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Made the column `serviceId` on table `Quote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `destinationAddress` on table `Quote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `destinationLat` on table `Quote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `destinationLng` on table `Quote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pickupLat` on table `Quote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pickupLng` on table `Quote` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `pricingType` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('DISTANCE', 'DAILY', 'HOURLY', 'PACKAGE');

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_serviceId_fkey";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "additionalRequirements",
DROP COLUMN "estimatedPrice",
DROP COLUMN "pricingType",
DROP COLUMN "vehicleCategory",
ADD COLUMN     "clerkUserId" TEXT,
ADD COLUMN     "depositAmount" DECIMAL(10,2),
ADD COLUMN     "durationMinutes" INTEGER,
ADD COLUMN     "pricingBreakdown" JSONB,
ADD COLUMN     "vehicleId" TEXT NOT NULL,
ADD COLUMN     "zoneMultiplier" DOUBLE PRECISION,
ALTER COLUMN "serviceId" SET NOT NULL,
ALTER COLUMN "destinationAddress" SET NOT NULL,
ALTER COLUMN "destinationLat" SET NOT NULL,
ALTER COLUMN "destinationLng" SET NOT NULL,
ALTER COLUMN "pickupLat" SET NOT NULL,
ALTER COLUMN "pickupLng" SET NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "basePrice" DOUBLE PRECISION,
ADD COLUMN     "pricingType" "PricingType" NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "pricePerDay",
ADD COLUMN     "dailyRate" DOUBLE PRECISION,
ADD COLUMN     "hourlyRate" DOUBLE PRECISION,
ADD COLUMN     "perKmRate" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Zone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
