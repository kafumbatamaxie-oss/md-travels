/*
  Warnings:

  - You are about to drop the column `dropoffDate` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `pickupDate` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `additionalRequirements` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `depositAmount` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `destinationAddress` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `distanceKm` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `dropoffDate` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `durationMinutes` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `passengers` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `pickupAddress` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `pickupDate` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `pickupTime` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `zoneMultiplier` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `pricingType` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `dailyRate` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `fuelType` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `hourlyRate` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `passengers` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `perKmRate` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the `Bookingpackage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Zone` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[bookingRef]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[quoteNumber]` on the table `Quote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingRef` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passengers` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickup` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `customerId` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quoteNumber` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricingModel` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PricingModel" AS ENUM ('AIRPORT_TRANSFER', 'SINGLE_TRIP', 'DAILY_TRIP', 'HALF_DAY_TRIP', 'HOURLY');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'DISABLED');

-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('ACTIVE', 'OFF_DUTY', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('PENDING', 'SENT', 'ACCEPTED', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('RESERVED', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "VehicleImage" DROP CONSTRAINT "VehicleImage_vehicleId_fkey";

-- DropIndex
DROP INDEX "Service_name_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "dropoffDate",
DROP COLUMN "pickupDate",
DROP COLUMN "totalAmount",
DROP COLUMN "userId",
ADD COLUMN     "bookingRef" TEXT NOT NULL,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "destination" TEXT,
ADD COLUMN     "distanceKm" DOUBLE PRECISION,
ADD COLUMN     "driverId" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "passengers" INTEGER NOT NULL,
ADD COLUMN     "pickup" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "BookingStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "additionalRequirements",
DROP COLUMN "depositAmount",
DROP COLUMN "destinationAddress",
DROP COLUMN "distanceKm",
DROP COLUMN "dropoffDate",
DROP COLUMN "durationMinutes",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "passengers",
DROP COLUMN "phone",
DROP COLUMN "pickupAddress",
DROP COLUMN "pickupDate",
DROP COLUMN "pickupTime",
DROP COLUMN "serviceId",
DROP COLUMN "total",
DROP COLUMN "vehicleId",
DROP COLUMN "zoneMultiplier",
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "quoteNumber" TEXT NOT NULL,
ADD COLUMN     "status" "QuoteStatus" NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "active",
DROP COLUMN "pricingType",
ADD COLUMN     "pricePerDay" DOUBLE PRECISION,
ADD COLUMN     "pricePerKm" DOUBLE PRECISION,
ADD COLUMN     "pricingModel" "PricingModel" NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "brand",
DROP COLUMN "category",
DROP COLUMN "dailyRate",
DROP COLUMN "description",
DROP COLUMN "fuelType",
DROP COLUMN "hourlyRate",
DROP COLUMN "passengers",
DROP COLUMN "perKmRate",
DROP COLUMN "updatedAt",
ADD COLUMN     "basePrice" DOUBLE PRECISION,
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "perDayPrice" DOUBLE PRECISION,
ADD COLUMN     "perKmPrice" DOUBLE PRECISION,
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "VehicleStatus" NOT NULL;

-- DropTable
DROP TABLE "Bookingpackage";

-- DropTable
DROP TABLE "VehicleImage";

-- DropTable
DROP TABLE "Zone";

-- DropEnum
DROP TYPE "PackageType";

-- DropEnum
DROP TYPE "PricingType";

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceVehicle" (
    "serviceId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "ServiceVehicle_pkey" PRIMARY KEY ("serviceId","vehicleId")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "license" TEXT,
    "status" "DriverStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteItem" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "vehicleId" TEXT,
    "description" TEXT,
    "passengers" INTEGER NOT NULL,
    "pickup" TEXT,
    "destination" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "distanceKm" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "QuoteItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT,
    "bookingId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "pdfUrl" TEXT,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingRef_key" ON "Booking"("bookingRef");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_quoteNumber_key" ON "Quote"("quoteNumber");

-- AddForeignKey
ALTER TABLE "ServiceVehicle" ADD CONSTRAINT "ServiceVehicle_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceVehicle" ADD CONSTRAINT "ServiceVehicle_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteItem" ADD CONSTRAINT "QuoteItem_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteItem" ADD CONSTRAINT "QuoteItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteItem" ADD CONSTRAINT "QuoteItem_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
