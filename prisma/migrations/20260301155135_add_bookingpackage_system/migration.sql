/*
  Warnings:

  - You are about to drop the column `clerkUserId` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `destinationLat` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `destinationLng` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `pdfUrl` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `pickupLat` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `pickupLng` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `pricingBreakdown` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Quote` table. All the data in the column will be lost.
  - You are about to alter the column `total` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `depositAmount` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to drop the column `imageUrl` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the `Inquiry` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `distanceKm` on table `Quote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total` on table `Quote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `depositAmount` on table `Quote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `durationMinutes` on table `Quote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zoneMultiplier` on table `Quote` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('AIRPORT_ONLY', 'DAILY_ONLY', 'FULL_PACKAGE');

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "clerkUserId",
DROP COLUMN "destinationLat",
DROP COLUMN "destinationLng",
DROP COLUMN "pdfUrl",
DROP COLUMN "pickupLat",
DROP COLUMN "pickupLng",
DROP COLUMN "pricingBreakdown",
DROP COLUMN "status",
ADD COLUMN     "additionalRequirements" TEXT,
ALTER COLUMN "distanceKm" SET NOT NULL,
ALTER COLUMN "total" SET NOT NULL,
ALTER COLUMN "total" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "depositAmount" SET NOT NULL,
ALTER COLUMN "depositAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "durationMinutes" SET NOT NULL,
ALTER COLUMN "durationMinutes" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "zoneMultiplier" SET NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "imageUrl";

-- DropTable
DROP TABLE "Inquiry";

-- CreateTable
CREATE TABLE "VehicleImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VehicleImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookingpackage" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "numberOfDays" INTEGER NOT NULL,
    "packageType" "PackageType" NOT NULL,
    "airportPrice" DOUBLE PRECISION NOT NULL,
    "dailyTripPrice" DOUBLE PRECISION NOT NULL,
    "depositRate" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "depositDue" DOUBLE PRECISION NOT NULL,
    "balanceDue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookingpackage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VehicleImage" ADD CONSTRAINT "VehicleImage_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
